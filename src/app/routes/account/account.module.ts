import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { AccountHomePageComponent } from './pages/account-home-page.component';

@NgModule({
  declarations: [AccountSettingComponent, AccountHomePageComponent],
  imports: [CommonModule],
})
export class AccountModule {}
