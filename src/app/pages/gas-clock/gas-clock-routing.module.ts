import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasClockComponent } from './gas-clock.component';

const routes: Routes = [{ path: '', component: GasClockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasClockRoutingModule { }
