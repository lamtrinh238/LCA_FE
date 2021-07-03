import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

import { UnverifiedEpdsRoutingModule } from './unverified-epds-routing.module';
import { UnverifiedEpdsComponent } from './unverified-epds.component';

@NgModule({
  declarations: [UnverifiedEpdsComponent],
  imports: [CommonModule, NzTableModule, UnverifiedEpdsRoutingModule],
})
export class UnverifiedEpdsModule {}
