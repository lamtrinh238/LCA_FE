import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { AccountHomePageComponent } from './pages/account-home-page.component';

@NgModule({
  declarations: [AccountSettingComponent, AccountHomePageComponent],
  imports: [CommonModule, NzPageHeaderModule, AccountRoutingModule],
})
export class AccountModule {}
