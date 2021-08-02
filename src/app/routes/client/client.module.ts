import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { ClientRoutingModule } from './client-routing.module';
import { ClientCreateComponent } from './conponents/client-create/client-create.component';
import { ClientCompanyComponent } from './conponents/client-edit/child/company/client-company.component';
import { ClientGeneralComponent } from './conponents/client-edit/child/general/client-general.component';
import { ClientUserComponent } from './conponents/client-edit/child/user/client-user.component';
import { ClientEditComponent } from './conponents/client-edit/client-edit.component';
import { ClientListComponent } from './conponents/client-list/client-list.component';
import { ClientHomePageComponent } from './pages/client-home-page.component';

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
  NzCheckboxModule,
  NzSelectModule,
  NzCardModule,
  NzButtonModule,
  NzGridModule,
  NzAnchorModule,
  NzIconModule,
  NzPopoverModule,
  NzModalModule,
  NzDatePickerModule,
  NzGridModule,
  NzIconModule,
  NzDividerModule,
];

const COMPONENTS = [
  ClientHomePageComponent,
  ClientListComponent,
  ClientEditComponent,
  ClientUserComponent,
  ClientGeneralComponent,
  ClientCreateComponent,
  ClientCompanyComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, ClientRoutingModule, ...NZ_UI_MODULES],
  declarations: [...COMPONENTS],
})
export class ClientModule {}
