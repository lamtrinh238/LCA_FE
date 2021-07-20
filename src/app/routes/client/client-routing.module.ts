import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientEditComponent } from './conponents/client-edit/client-edit.component';
import { ClientHomePageComponent } from './pages/client-home-page.component';

const routes: Routes = [
  { path: '', component: ClientHomePageComponent },
  { path: ':clientID', component: ClientEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
