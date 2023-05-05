import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent{


  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loadingService: FakeLoadingService,
    private authService: AuthService){}

  userForm = this.createForm({
    email: '',
    password: '',
  });

  createForm(model: User){
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.maxLength(100), Validators.email]);
    formGroup.get('password')?.addValidators([Validators.required, Validators.maxLength(100)]);
    return formGroup;
  }


  async login(){
    this.loading = true;
    this.authService.login(this.userForm.get('email')?.value as string, this.userForm.get('password')?.value as string).then(_ => {
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch((error) => {
      console.error(error);
      this.loading = false;
    });
  }
}
