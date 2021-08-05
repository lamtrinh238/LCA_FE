import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserChangePasswordComponent } from './pages/user-change-password/user-change-password.component';
import { UserHomePageComponent } from './pages/user-home-page.component';

const routes: Routes = [
    { path: '', component: UserHomePageComponent },
    { path: 'change-password', component: UserChangePasswordComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
