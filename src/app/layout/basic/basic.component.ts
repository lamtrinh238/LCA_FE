import { Component } from '@angular/core';
import { AuthenticatedUser, AuthenticationService } from '@core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-basic',
  templateUrl: 'basic.component.html',
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/img/lca-logo.png`,
    logoCollapsed: `./assets/img/lca-logo.png`,
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  get user(): AuthenticatedUser {
    return this.authenticationService.currentUserValue;
  }

  constructor(private authenticationService: AuthenticationService, private settings: SettingsService) {}
}
