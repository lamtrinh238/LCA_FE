import { Component } from '@angular/core';
import { AuthenticatedUser, AuthenticationService, ClientModel } from '@core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-basic',
  templateUrl: 'basic.component.html',
  styles: [
    `
      nz-select {
        min-width: 200px;
      }
    `,
  ],
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/img/lca-logo.png`,
    logoCollapsed: `./assets/img/lca-logo.png`,
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  selectedCompany: { comId: number; compName: string } | undefined;
  user: AuthenticatedUser;
  companies: { comId: number; compName: string }[];

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.comId === o2.comId : o1 === o2);

  constructor(private authenticationService: AuthenticationService, private settings: SettingsService) {
    this.user = this.authenticationService.currentUserValue;
    this.companies = this.user.companies.map((c: ClientModel) => {
      return {
        comId: c.comId,
        compName: c.comCompanyname,
      };
    });

    const activeComp = this.user.getActiveCompany();
    this.selectedCompany = activeComp ? { comId: activeComp.comId, compName: activeComp.comCompanyname } : undefined;
  }

  onShowCompanies(): void {}

  onSwitch(comp: any): void {
    this.authenticationService.setActiveCompany(comp.comId);
  }
}
