import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasClockRoutingModule } from './gas-clock-routing.module';
import { GasClockComponent } from './gas-clock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    GasClockComponent
  ],
  imports: [
    CommonModule,
    GasClockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class GasClockModule { }
