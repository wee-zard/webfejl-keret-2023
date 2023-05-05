import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';

const routes: Routes = [
{
  path: '', component: SignupComponent
},
{
  path: 'successful', loadChildren: () => import('./successful/successful.module').then(m => m.SuccessfulModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
