import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomePageComponent } from './pages/user-home-page.component';

const routes: Routes = [{ path: '', component: UserHomePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
