import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NewUser } from '../../shared/models/NewUser';
import { UserService } from '../../shared/services/user.service';
import { SettingService } from '../../shared/services/setting.service';
import { Setting } from '../../shared/models/Setting';
import { Address } from '../../shared/models/Address';
import { AddressService } from '../../shared/services/address.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private settingService: SettingService,
    private addressService: AddressService){}

  registeringForm_part1 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9@.]*')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]),
    repassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')])
  });

  registeringForm_part2 = new FormGroup({
    birthdate: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9-]*'), Validators.maxLength(30)]),
    firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-íéáűúőöüóÍÉÁŰÚŐÖÜÓ]*')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-íéáűúőöüóÍÉÁŰÚŐÖÜÓ]*')])
  });

  registeringForm_part3 = new FormGroup({
    city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9- íéáűúőöüóÍÉÁŰÚŐÖÜÓ.]*')]),
    street: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9- íéáűúőöüóÍÉÁŰÚŐÖÜÓ.]*')]),
    housenumber: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9-/ .]*')]),
  });

  completeRegistration(){
    if(this.registeringForm_part1.valid && this.registeringForm_part2.valid && this.registeringForm_part3.valid &&
      this.registeringForm_part1.get('password')?.value === this.registeringForm_part1.get('repassword')?.value){
      this.authService.signup(this.registeringForm_part1.get('email')?.value as string,
      this.registeringForm_part1.get('password')?.value as string).then(cred =>{
        const user: NewUser = {
          id: cred.user?.uid as string,
          email: this.registeringForm_part1.get('email')?.value as string,
          username: this.registeringForm_part2.get('username')?.value as string,
          birthdate: new Date(this.registeringForm_part2.get('birthdate')?.value as string).getTime(),
          name: {
            firstname: this.registeringForm_part2.get('firstname')?.value as string,
            lastname: this.registeringForm_part2.get('lastname')?.value as string,
          }
        };
        this.userService.create(user).then(_ => {
          const userSettings: Setting = {
            id: '',
            is_theme_dark: false,
            selected_language: 'english',
            user_id: cred.user?.uid as string
          };
          this.settingService.create(userSettings).then(__ => {
            const userAddress: Address = {
              id: '',
              user_id: cred.user?.uid as string,
              address: {
                city: this.registeringForm_part3.get('city')?.value as string,
                street: this.registeringForm_part3.get('street')?.value as string,
                housenumber: this.registeringForm_part3.get('housenumber')?.value as string
              }
            };
            this.addressService.create(userAddress).then(___ => {
              this.router.navigateByUrl('/signup/successful/' + user.email);
            }).catch(error3 =>{
              console.error(error3);
            });
          }).catch(error2 => {
            console.error(error2);
          });
        }).catch(error1 =>{
          console.error(error1);
        });
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
