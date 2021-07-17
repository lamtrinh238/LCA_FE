import { CommonModule } from '@angular/common';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
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
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoutedComponent } from './user-routed.component';

@NgModule({
  declarations: [UserRoutedComponent, UserListComponent, CreateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
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
  ],
})
export class UserModule {}
