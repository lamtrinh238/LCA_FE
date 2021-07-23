import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnAuthGuard } from '@core';

import { LayoutPassportComponent } from '../../layout/passport/passport.component';
import { CallbackComponent } from './callback.component';
import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';
import { UserRegisterResultComponent } from './register-result/register-result.component';
import { UserRegisterComponent } from './register/register.component';

const routes: Routes = [
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        canActivate: [UnAuthGuard],
        data: { title: 'Log in', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: 'Registered', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: 'Registration result', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: 'Lock screen', titleI18n: 'app.lock' },
      },
    ],
  },
  // Single page does not package Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportRoutingModule {}
