import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { EpdHeadingComponent } from '../epd/epd-heading/epd-heading.component';
const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children: [{ path: '', redirectTo: 'user-list', pathMatch: 'full' }],
  },
];
@NgModule({
  declarations: [UserComponent, UserListComponent, EpdHeadingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzRadioModule,
    NzTableModule,
    NzTabsModule,
    NzButtonModule,
    NzGridModule,
  ],
})
export class UserModule {}
