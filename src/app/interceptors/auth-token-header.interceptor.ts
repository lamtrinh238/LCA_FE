import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService, SessionService } from '@core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenHeaderInterceptor implements HttpInterceptor {
  constructor(private authenticationService: SessionService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.authenticationService.authenticatedUserSnapshot?.token;
    const activeCompany = this.authenticationService.authenticatedUserSnapshot?.getActiveCompany()?.comId;

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken).set('Company-Id', activeCompany ? activeCompany.toString() : ''),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
