import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { CallbackComponent } from './callback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';
import { PassportRoutingModule } from './passport-routing.module';
import { UserRegisterResultComponent } from './register-result/register-result.component';
import { UserRegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const COMPONENTS = [
    UserLoginComponent,
    UserRegisterResultComponent,
    UserRegisterComponent,
    UserLockComponent,
    CallbackComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
];
const NZ_UI_MODULES = [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzLayoutModule,
    NzModalModule,
    NzPageHeaderModule,
    NzRadioModule,
    NzTableModule,
    NzTabsModule,
    NzButtonModule,
    NzGridModule,
    NzAnchorModule,
    NzIconModule,
    NzPopoverModule,
    NzModalModule,
    NzGridModule,
    NzIconModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzCardModule,
    NzResultModule,
];
@NgModule({
    imports: [SharedModule, PassportRoutingModule, TranslateModule, FormsModule, ReactiveFormsModule, ...NZ_UI_MODULES],
    declarations: [...COMPONENTS],
})
export class PassportModule {}
