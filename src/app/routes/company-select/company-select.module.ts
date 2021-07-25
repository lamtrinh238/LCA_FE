import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
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
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { CompanySelectRoutingModule } from './company-select-routing.module';
import { CompanySelectComponent } from './company-select.component';

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
];

@NgModule({
  declarations: [CompanySelectComponent],
  imports: [CommonModule, ...NZ_UI_MODULES, FormsModule, ReactiveFormsModule, CompanySelectRoutingModule],
})
export class CompanySelectModule {}
