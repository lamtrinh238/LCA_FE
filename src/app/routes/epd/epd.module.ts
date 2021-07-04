import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { EpdHeadingComponent } from './epd-heading/epd-heading.component';

import { EpdRoutingModule } from './epd-routing.module';

@NgModule({
  declarations: [EpdHeadingComponent],
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
    EpdRoutingModule,
  ],
})
export class EpdModule {}
