import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressSuccessfulRoutingModule } from './address-successful-routing.module';
import { AddressSuccessfulComponent } from './address-successful.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AddressSuccessfulComponent
  ],
  imports: [
    CommonModule,
    AddressSuccessfulRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AddressSuccessfulModule { }
