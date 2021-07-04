import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';

import { UnverifiedEpdsRoutingModule } from './unverified-epds-routing.module';
import { UnverifiedEpdsComponent } from './unverified-epds.component';

@NgModule({
  declarations: [UnverifiedEpdsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzRadioModule,
    NzGridModule,
    NzLayoutModule,
    UnverifiedEpdsRoutingModule,
  ],
})
export class UnverifiedEpdsModule {}
