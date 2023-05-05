import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressSuccessfulComponent } from './address-successful.component';

const routes: Routes = [{ path: ':modificationOnAddress', component: AddressSuccessfulComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressSuccessfulRoutingModule { }
