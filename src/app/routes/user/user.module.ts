import { CommonModule } from '@angular/common';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserRoutingModule } from './user-routing.module';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserHomePageComponent } from './pages/user-home-page.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';

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
  NzPaginationModule
];

@NgModule({
  declarations: [
    UserHomePageComponent,
    UserListComponent,
    CreateUserComponent,
    UserDetailComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ...NZ_UI_MODULES,
    NzSelectModule,
  ],
})
export class UserModule {}
