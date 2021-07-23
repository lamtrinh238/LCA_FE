import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from '@delon/cache';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthenticatedUser, AuthUser, LoginRequest } from '../models/user';

enum SessionKey {
  AuthenticatedUser = 'AuthenticatedUser',
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AuthenticatedUser>;
  currentUser: Observable<AuthenticatedUser>;

  private authStartSource = new Subject<LoginRequest>();
  authStart$ = this.authStartSource.asObservable();

  private authFailSource = new Subject<any>();
  authFailed$ = this.authFailSource.asObservable();

  private authSucceedSource = new Subject<AuthenticatedUser>();
  authSucceed$ = this.authSucceedSource.asObservable();

  constructor(private http: HttpClient, private cacheService: CacheService) {
    this.authStart$.pipe(exhaustMap((loginReq: LoginRequest) => this.login(loginReq))).subscribe({
      next: (res: AuthenticatedUser | HttpErrorResponse) => {
        const succeed = (res as AuthenticatedUser)?.token;
        if (succeed) {
          this.authSucceedSource.next(res as AuthenticatedUser);
        } else {
          this.authFailSource.next(res);
        }

        console.log(res);
      },
    });
  }

  startLogin(loginReq: LoginRequest): void {
    this.authStartSource.next(loginReq);
  }

  get currentUserValue(): AuthenticatedUser {
    return this.cacheService.getNone<AuthenticatedUser>(SessionKey.AuthenticatedUser);
  }

  hasAuthenticated(): boolean {
    return this.currentUserValue?.token !== undefined;
  }
  private login(loginRequest: LoginRequest): Observable<AuthenticatedUser | HttpErrorResponse> {
    return this.http.post<AuthenticatedUser>(`${environment.api.baseUrl}/auths/authenticate`, loginRequest).pipe(
      tap((userLogged: AuthenticatedUser) => this.cacheService.set(SessionKey.AuthenticatedUser, userLogged)),
      catchError((err: HttpErrorResponse) => {
        return of(err);
      }),
    );
  }

  logout(): void {
    this.cacheService.remove(SessionKey.AuthenticatedUser);
  }
}
