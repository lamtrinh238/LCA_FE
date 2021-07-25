import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';
@Injectable({ providedIn: 'root' })
export class CompanySelectGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService, private sessionService: SessionService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.sessionService.authenticatedUserSnapshot?.hasActiveCompany()) {
      return true;
    }

    this.sessionService.openSelectCompnay();
    return false;
  }
}
