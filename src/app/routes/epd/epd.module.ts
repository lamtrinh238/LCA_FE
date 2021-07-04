import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EpdHeadingComponent } from './epd-heading/epd-heading.component';

import { EpdRoutingModule } from './epd-routing.module';

@NgModule({
  declarations: [EpdHeadingComponent],
  imports: [CommonModule, TranslateModule, NzDividerModule, NzTableModule, NzRadioModule, EpdRoutingModule],
})
export class EpdModule {}
