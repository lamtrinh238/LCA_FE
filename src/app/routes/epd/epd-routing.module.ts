import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpdHeadingComponent } from './epd-heading/epd-heading.component';

const routes: Routes = [
  {
    path: '',
    component: EpdHeadingComponent,
    children: [
      {
        path: 'unverified-epds',
        loadChildren: () => import('./unverified-epds/unverified-epds.module').then((m) => m.UnverifiedEpdsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpdRoutingModule {}
