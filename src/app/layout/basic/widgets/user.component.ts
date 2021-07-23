import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUser, AuthenticationService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService } from '@delon/theme';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'header-user',
  template: `
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      <i nz-icon nzType="user" class="mr-sm"></i> {{ user.usrLoginname }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon nzType="user" class="mr-sm"></i>
          {{ 'menu.account.center' | translate }}
        </div>
        <div nz-menu-item routerLink="account-setting">
          <i nz-icon nzType="setting" class="mr-sm"></i>
          {{ 'menu.account.settings' | translate }}
        </div>
        <!-- <div nz-menu-item routerLink="/exception/trigger">
          <i nz-icon nzType="close-circle" class="mr-sm"></i>
          {{ 'menu.account.trigger' | translate }}
        </div> -->
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | translate }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  get user(): any {
    return this.authenticateService.currentUserValue;
  }

  constructor(
    private authenticateService: AuthenticationService,
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout(): void {
    // remove user from local storage and set current user to null
    this.authenticateService.logout();
    this.router.navigate(['passport/login']);
  }
}
