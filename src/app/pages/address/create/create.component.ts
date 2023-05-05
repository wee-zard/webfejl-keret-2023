import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from '../../../shared/models/Address';
import { AddressService } from '../../../shared/services/address.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Setting } from '../../../shared/models/Setting';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {

  @Input() userSetting?: Setting;

  constructor(
    private addressService: AddressService,
    private router: Router){ }

  loadingSubscription?: Subscription;
  registeringNewAddress = new FormGroup({
    city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9-íéáűúőöüóÍÉÁŰÚŐÖÜÓ.]*')]),
    street: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9- íéáűúőöüóÍÉÁŰÚŐÖÜÓ.]*')]),
    housenumber: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9- .]*')]),
  });

  onSubmit(){
    if(this.registeringNewAddress.valid){
      const user = JSON.parse((localStorage.getItem('user')) as string) as firebase.default.User;
      const userAddress: Address = {
        id: '',
        user_id: user.uid as string,
        address: {
          city: this.registeringNewAddress.get('city')?.value as string,
          street: this.registeringNewAddress.get('street')?.value as string,
          housenumber: this.registeringNewAddress.get('housenumber')?.value as string
        }
      };

      const loadingSubscription1 = this.addressService.checkIfAddressCityStreetHousenumberAldreadyExist(userAddress).subscribe((checkIfAddressIsExist: Array<Address>) => {
        if(checkIfAddressIsExist.length == 0){
          this.addressService.create(userAddress).then(_ => {
            this.router.navigateByUrl('/address/address-successful/' + ('create' + ':' + userAddress.address.city + ':' + userAddress.address.street + ':' + userAddress.address.housenumber));
          }).catch(error =>{
            console.error(error);
          });
        }
        loadingSubscription1.unsubscribe();
      }, error =>{
        console.error(error);
      });
    }
  }
}
