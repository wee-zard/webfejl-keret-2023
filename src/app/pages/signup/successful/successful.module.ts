import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessfulRoutingModule } from './successful-routing.module';
import { SuccessfulComponent } from './successful.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SuccessfulComponent
  ],
  imports: [
    CommonModule,
    SuccessfulRoutingModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SuccessfulModule { }
