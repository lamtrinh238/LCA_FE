import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, CompanySelectGuard } from '@core';
import { SimpleGuard } from '@delon/auth';
// layout
import { LayoutAuthenticatedComponent } from '../layout/basic/layout-authenticated.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthenticatedComponent,
    canActivate: [AuthGuard],
    data: {},
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard, CompanySelectGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [AuthGuard, CompanySelectGuard],
      },
      { path: 'delon', loadChildren: () => import('./delon/delon.module').then((m) => m.DelonModule) },
      { path: 'extras', loadChildren: () => import('./extras/extras.module').then((m) => m.ExtrasModule) },
      {
        path: 'epd',
        loadChildren: () => import('./epd/epd.module').then((m) => m.EpdModule),
        canActivate: [AuthGuard, CompanySelectGuard],
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard, CompanySelectGuard],
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
        canActivate: [AuthGuard, CompanySelectGuard],
      },
      { path: 'company-select', loadChildren: () => import('./company-select/company-select.module').then((m) => m.CompanySelectModule) },
    ],
  },
  // passport
  { path: '', loadChildren: () => import('./passport/passport.module').then((m) => m.PassportModule) },
  { path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) },

  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false, // environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
