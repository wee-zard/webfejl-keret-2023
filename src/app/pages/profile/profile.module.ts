import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ViewerComponent } from './viewer/viewer.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SzulDateFormatPipe } from '../../shared/pipes/szul-date-format.pipe';

@NgModule({
  declarations: [
    ProfileComponent,
    ListComponent,
    ViewerComponent,
    SzulDateFormatPipe
],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class ProfileModule { }
