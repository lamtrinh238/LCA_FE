import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AuthenticatedUser, ClientModel, SessionService } from '@core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultComponent, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';
import { extend } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'layout-basic',
  templateUrl: 'layout-authenticated.component.html',
  styles: [
    `
      nz-select {
        min-width: 200px;
      }
    `,
  ],
})
export class LayoutAuthenticatedComponent {
  @ViewChild('layoutRef', { read: LayoutDefaultComponent }) layoutRef: LayoutDefaultComponent;
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/img/lca-logo.png`,
    logoCollapsed: `./assets/img/lca-logo.png`,
    hideAside: !this.sessionService.authenticatedUserSnapshot?.hasActiveCompany(),
  };
  selectedCompany$: Observable<{ comId: number; compName: string } | undefined>;
  user$: Observable<AuthenticatedUser>;

  constructor(private sessionService: SessionService, private settings: SettingsService, private changeDetetorRef: ChangeDetectorRef) {
    this.user$ = this.sessionService.authenticatedUser$;
    this.selectedCompany$ = this.user$.pipe(
      map((user: AuthenticatedUser) => {
        const activeComp = user?.getActiveCompany();

        this.options = extend({}, this.options, { hideAside: !user?.hasActiveCompany() });
        this.changeDetetorRef.detectChanges();
        this.settings.setLayout('collapsed', false);
        return activeComp ? { comId: activeComp.comId, compName: activeComp.comCompanyname } : undefined;
      }),
    );
  }

  onShowCompanies(): void {}

  onSelectCompany(): void {
    this.sessionService.openSelectCompnay();
  }
}
