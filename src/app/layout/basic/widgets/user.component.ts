import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AuthenticatedUser, AuthenticationService, SessionService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Observable } from 'rxjs';

@Component({
    selector: 'header-user',
    template: `
        <div
            class="alain-default__nav-item d-flex align-items-center px-sm"
            nz-dropdown
            nzPlacement="bottomRight"
            [nzDropdownMenu]="userMenu"
        >
            <i nz-icon nzType="user" class="mr-sm"></i> {{ (user$ | async)?.usrLoginname }}
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
            <div nz-menu class="width-sm">
                <div nz-menu-item routerLink="profile">
                    <i nz-icon nzType="user" class="mr-sm"></i>
                    {{ 'menu.account.settings' | translate }}
                </div>
                <div nz-menu-item routerLink="user/change-password">
                    <i nz-icon nzType="lock" class="mr-sm"></i>
                    {{ 'menu.account.change.password' | translate }}
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
    user$: Observable<AuthenticatedUser>;
    constructor(
        private sessionService: SessionService,
        private authenticationService: AuthenticationService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {
        this.user$ = this.sessionService.authenticatedUser$;
    }

    logout(): void {
        // remove user from local storage and set current user to null
        this.authenticationService.logout();
    }
}
