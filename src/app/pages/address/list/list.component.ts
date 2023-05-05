import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from '../../../shared/models/Address';
import { AddressDictation } from '../../../shared/models/AddressDictation';
import { Dictation } from '../../../shared/models/Dictation';
import { AddressService } from '../../../shared/services/address.service';
import { DictationService } from '../../../shared/services/dictation.service';
import { Setting } from '../../../shared/models/Setting';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  constructor(
    private addressService: AddressService,
    private dictationService: DictationService){
   }

  @Input() userSetting?: Setting;
  @Input() addressObjectInput?: Array<AddressDictation> = [];
  @Output() addressEmitter: EventEmitter<any> = new EventEmitter();

  userAddresses_Dictations: Array<AddressDictation> = [];
  loadingSubscription?: Subscription;
  priceOfGas: number = 189;

  ngOnInit(){
    this.getEveryAddressAndDictations();
  }

  getEveryAddressAndDictations(){
    const user = JSON.parse((localStorage.getItem('user')) as string) as firebase.default.User;
    this.userAddresses_Dictations = [];
    this.loadingSubscription = this.addressService.getAllAddressedByUserId(user.uid).subscribe((addressList: Array<Address>) => {
      this.loadingSubscription?.unsubscribe();
      for(let objectForAddress of addressList){
        const subs2 = this.dictationService.getAllDictationsByAddressId(objectForAddress.id).subscribe((dictationList: Array<Dictation>) =>{
          let finalAddressDictationObject: AddressDictation = {
            address: {...objectForAddress},
            dictation: []
          }
          for(let objectForDictation of dictationList){
            let localDictationOfaSelectedAddress: Dictation = {
              id: objectForDictation.id,
              address_id: objectForDictation.address_id,
              dictation_date: objectForDictation.dictation_date,
              gas_meter: objectForDictation.gas_meter,
              usedUpGas: 0
            }
            finalAddressDictationObject.dictation.push({...localDictationOfaSelectedAddress});
          }
          if(finalAddressDictationObject.dictation.length > 1){
            for(let i_index=0; i_index < finalAddressDictationObject.dictation.length-1; i_index++){
              finalAddressDictationObject.dictation[i_index].usedUpGas =
              (finalAddressDictationObject.dictation[i_index].gas_meter -
              finalAddressDictationObject.dictation[i_index + 1].gas_meter) * this.priceOfGas;
            }
          }
          this.userAddresses_Dictations.push({...finalAddressDictationObject});
          this.addressEmitter.emit(this.userAddresses_Dictations);
          subs2.unsubscribe();
        }, error1 =>{
          console.error(error1);
        });
      }
      this.loadingSubscription?.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }
}
