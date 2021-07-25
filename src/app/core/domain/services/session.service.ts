import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheNotifyResult, CacheService } from '@delon/cache';
import { extend } from 'lodash';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionKey } from '../models';
import { AuthenticatedUser, AuthUser, LoginRequest } from '../models/user';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private _authenticatedUser: AuthenticatedUser;
  authenticatedUser$: Observable<AuthenticatedUser>;
  constructor(private http: HttpClient, private cacheService: CacheService, private router: Router) {
    this.authenticatedUser$ = this.cacheService
      .notify(SessionKey.AuthenticatedUser)
      .pipe(map((value: CacheNotifyResult) => extend(new AuthenticatedUser(), value.value)));

    this.setSsessionUser(this.authenticatedUserSnapshot);
  }

  get authenticatedUserSnapshot(): AuthenticatedUser {
    return extend(new AuthenticatedUser(), this.cacheService.getNone<AuthenticatedUser>(SessionKey.AuthenticatedUser));
  }

  setSsessionUser(authenticated: AuthenticatedUser): void {
    this.cacheService.set(SessionKey.AuthenticatedUser, authenticated);
  }

  destroySession(): void {
    this.cacheService.remove(SessionKey.AuthenticatedUser);
  }

  setActiveCompany(comId: number): void {
    const currentUserValue = this.authenticatedUserSnapshot;
    currentUserValue.setActiveCompany(comId);
    this.cacheService.set(SessionKey.AuthenticatedUser, currentUserValue);
  }

  openSelectCompnay(): void {
    this.router.navigate(['company-select']);
  }

  gotoHome(): void {
    this.router.navigate(['']);
  }
}
