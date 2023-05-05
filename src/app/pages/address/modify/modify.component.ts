import { Component, Input } from '@angular/core';
import { Address } from '../../../shared/models/Address';
import { AddressDictation } from '../../../shared/models/AddressDictation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../../shared/services/address.service';
import { DictationService } from '../../../shared/services/dictation.service';
import { Dictation } from '../../../shared/models/Dictation';
import { Router } from '@angular/router';
import { Setting } from '../../../shared/models/Setting';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.sass']
})
export class ModifyComponent {

  @Input() userSetting?: Setting;
  @Input() addressInput?: Array<AddressDictation>;

  globalSelectedAddress?: Address;
  modifyingAddress = new FormGroup({
    city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9-íéáűúőöüó.]*')]),
    street: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9- íéáűúőöüó.]*')]),
    housenumber: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9-/ .]*')]),
  });

  constructor(
    private addressService: AddressService,
    private dictationService: DictationService,
    private router: Router){}

  selectAddress(selectedAddress: any){
    this.globalSelectedAddress = selectedAddress.value.address;
  }

  onModify(){
    if(this.modifyingAddress.valid && this.globalSelectedAddress){
      const modifyAddress: Address = {
        id: this.globalSelectedAddress?.id,
        user_id: this.globalSelectedAddress?.user_id,
        address:{
          city: this.modifyingAddress.get('city')?.value as string,
          street: this.modifyingAddress.get('street')?.value as string,
          housenumber: this.modifyingAddress.get('housenumber')?.value as string
        }
      }
      this.addressService.update(modifyAddress).then(_ =>{
        this.router.navigateByUrl('/address/address-successful/' + ('update' + ':' + modifyAddress.address.city + ':' + modifyAddress.address.street + ':' + modifyAddress.address.housenumber));
      }).catch(error => {
        console.error(error);
      });
    }
  }

  OnDelete(){
    if(this.globalSelectedAddress){
      const loadingSubscription = this.dictationService.getAllDictationsByAddressIdForDelete(this.globalSelectedAddress.id).subscribe((addressList: Array<Dictation>) =>{
        for(let dictationObject of addressList){
          this.dictationService.delete(dictationObject.id).then(_ => {}).catch(error => {console.error(error);});
        }
        loadingSubscription.unsubscribe();
      }, error1 =>{
        console.error(error1);
      });
      this.addressService.delete(this.globalSelectedAddress?.id as string).then(_ =>{
          this.router.navigateByUrl('/address/address-successful/' +
          ('delete' + ':' + this.globalSelectedAddress?.address.city + ':'
          + this.globalSelectedAddress?.address.street + ':'
          + this.globalSelectedAddress?.address.housenumber));

      }).catch(error => {
        console.error(error);
      });
    }
  }
}
