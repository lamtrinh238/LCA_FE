import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenHeaderInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.authenticationService.currentUserValue?.token;
    const activeCompany = this.authenticationService.currentUserValue?.getActiveCompany()?.comId;

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken).set('comId', activeCompany ? activeCompany.toString() : ''),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
