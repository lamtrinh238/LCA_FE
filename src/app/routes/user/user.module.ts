import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { UserListModalComponent } from './components/user-list/user-list-modal/user-list-modal/user-list-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children: [{ path: '', redirectTo: 'user-list', pathMatch: 'full' }],
  },
];
@NgModule({
  declarations: [UserComponent, UserListComponent, EpdHeadingComponent, UserListModalComponent],
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
    NzAnchorModule,
    NzIconModule,
    NzPopoverModule,
    NzModalModule,
  ],
})
export class UserModule {}
