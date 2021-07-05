import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators';

const CODEMESSAGE: { [key: number]: string } = {
  200: 'The server successfully returns the requested data.',
  201: 'New or modify the data success.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'Delete data success.',
  400: 'The request issued has an error, and the server does not have new or modified data.',
  401: 'Users no permissions (token, user name, password error).',
  403: 'User is authorized, but access is disabled.',
  404: 'The request for issued is a record that does not exist, and the server does not operate.',
  406: 'The format requested is not available.',
  410: 'The requested resource is permanently deleted and will not be obtained.',
  422: 'When an object is created, a verification error occurs.',
  500: 'The server has an error, please check the server.',
  502: 'Gateway error.',
  503: 'The service is not available, the server temporarily overloads or maintains.',
  504: 'Gateway timeout.',
};

/**
 * Default HTTP interceptor, the registration details see `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private refreshTokenEnabled = environment.api.refreshTokenEnabled;
  private refreshTokenType: 're-request' | 'auth-refresh' = environment.api.refreshTokenType;
  private refreshToking = false;
  private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private injector: Injector) {
    if (this.refreshTokenType === 'auth-refresh') {
      this.buildAuthRefresh();
    }
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private get tokenSrv(): ITokenService {
    return this.injector.get(DA_SERVICE_TOKEN);
  }

  private get http(): _HttpClient {
    return this.injector.get(_HttpClient);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase): void {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  /**
   * Refresh token request
   */
  private refreshTokenRequest(): Observable<any> {
    const model = this.tokenSrv.get();
    return this.http.post(`/api/auth/refresh`, null, null, { headers: { refresh_token: model?.refresh_token || '' } });
  }

  // #region Refresh token method 1: Refresh by 401 Token

  private tryRefreshToken(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // 1、If the request is refreshed token request, it means that from the refresh token can directly jump on the login page.
    if ([`/api/auth/refresh`].some((url) => req.url.includes(url))) {
      this.toLogin();
      return throwError(ev);
    }
    // 2、If `refreshtoking` is the` True` indicating that it is already in the request refresh token, follow-up all requests to the waiting state until the result is returned to re-initiate the request
    if (this.refreshToking) {
      return this.refreshToken$.pipe(
        filter((v) => !!v),
        take(1),
        switchMap(() => next.handle(this.reAttachToken(req))),
      );
    }
    // 3、Try to call refresh token
    this.refreshToking = true;
    this.refreshToken$.next(null);

    return this.refreshTokenRequest().pipe(
      switchMap((res) => {
        // Notify follow-up requests to continue
        this.refreshToking = false;
        this.refreshToken$.next(res);
        // Re-save new token
        this.tokenSrv.set(res);
        // Reissue request
        return next.handle(this.reAttachToken(req));
      }),
      catchError((err) => {
        this.refreshToking = false;
        this.toLogin();
        return throwError(err);
      }),
    );
  }

  /**
   * Reissue new token information
   *
   * > Since the request has been initiated, will not go again next `@Delon / auth` therefore need to be re-attached to the business situation to restart the new token
   */
  private reAttachToken(req: HttpRequest<any>): HttpRequest<any> {
    // The following example is used by NG-ALAIN default `SimpleInterceptor`
    const token = this.tokenSrv.get()?.token;
    return req.clone({
      setHeaders: {
        token: `Bearer ${token}`,
      },
    });
  }

  // #endregion

  // #region Refresh token method 2: Using `@ delon / auth`s`

  private buildAuthRefresh(): void {
    if (!this.refreshTokenEnabled) {
      return;
    }
    this.tokenSrv.refresh
      .pipe(
        filter(() => !this.refreshToking),
        switchMap((res) => {
          console.log(res);
          this.refreshToking = true;
          return this.refreshTokenRequest();
        }),
      )
      .subscribe(
        (res) => {
          // TODO: Mock expired value
          res.expired = +new Date() + 1000 * 60 * 5;
          this.refreshToking = false;
          this.tokenSrv.set(res);
        },
        () => this.toLogin(),
      );
  }

  // #endregion

  private toLogin(): void {
    this.notification.error(`Not logged in or logged in has expired, please log in again。`, ``);
    this.goTo('/passport/login');
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.checkStatus(ev);
    switch (ev.status) {
      case 200:
        // Business-level error handling, the following is to assume that Restful has a unified output format (meaning that there is a corresponding data format regardless of success or failure).
        // For example, response content:
        // Error content: {status: 1, msg:'illegal parameter'}
        // Correct content: {status: 0, response: {}}
        // Then the following code snippets can be directly applied
        // if (ev instanceof HttpResponse) {
        // const body = ev.body;
        // if (body && body.status !== 0) {
        // this.injector.get(NzMessageService).error(body.msg);
        // // Note: If you continue to throw an error here, it will be intercepted by catchError on line 254, causing the external implementation of Pipe and subscribe operations to be interrupted, for example: this.http.get('/').subscribe() no Will trigger
        // // If you want external implementation, you need to manually remove line 254
        // return throwError({});
        // } else {
        // // Re-modify the content of `body` to the content of `response`. For most scenarios, you no longer need to care about the business status code
        // return of(new HttpResponse(Object.assign(ev, {body: body.response })));
        // // or still maintain the complete format
        // return of(ev);
        // }
        // }
        break;
      case 401:
        if (this.refreshTokenEnabled && this.refreshTokenType === 're-request') {
          return this.tryRefreshToken(ev, req, next);
        }
        this.toLogin();
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn(
            'Unknown errors, mostly caused by the backend does not support cross-domain CORS or invalid configuration, please refer to https://ng-alain.com/docs/server to solve cross-domain issues',
            ev,
          );
        }
        break;
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  private getAdditionalHeaders(headers?: HttpHeaders): { [name: string]: string } {
    const res: { [name: string]: string } = {};
    const lang = this.injector.get(ALAIN_I18N_TOKEN).currentLang;
    if (!headers?.has('Accept-Language') && lang) {
      res['Accept-Language'] = lang;
    }

    return res;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Uniformly add server prefix
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.api.baseUrl + url;
    }

    const newReq = req.clone({ url, setHeaders: this.getAdditionalHeaders(req.headers) });
    return next.handle(newReq).pipe(
      mergeMap((ev) => {
        // Allow unified handling of request errors
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, newReq, next);
        }
        // If everything is normal, follow up operations
        return of(ev);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next)),
    );
  }
}
