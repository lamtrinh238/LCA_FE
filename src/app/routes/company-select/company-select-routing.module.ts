import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySelectComponent } from './company-select.component';

const routes: Routes = [{ path: '', component: CompanySelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanySelectRoutingModule {}
