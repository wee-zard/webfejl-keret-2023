import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address.component';

const routes: Routes = [
{
  path: '', component: AddressComponent
},
{
  path: 'address-successful',
  loadChildren: () => import('./address-successful/address-successful.module').then(m => m.AddressSuccessfulModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
