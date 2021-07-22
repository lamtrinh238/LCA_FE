import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { AccountHomePageComponent } from './pages/account-home-page.component';

@NgModule({
  declarations: [AccountSettingComponent, AccountHomePageComponent],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    AccountRoutingModule,
    NzFormModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
  ],
})
export class AccountModule {}
