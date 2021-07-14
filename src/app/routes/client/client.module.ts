import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './list/list.component';

const COMPONENTS = [ClientListComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzDividerModule,
    NzTableModule,
    NzRadioModule,
    NzTabsModule,
    NzPageHeaderModule,
    ClientRoutingModule,
    NzInputModule,
  ],
  declarations: [...COMPONENTS],
})
export class ClientModule {}
