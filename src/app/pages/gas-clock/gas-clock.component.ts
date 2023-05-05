import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from '../../shared/models/Address';
import { AddressService } from '../../shared/services/address.service';
import { DictationService } from '../../shared/services/dictation.service';
import { Dictation } from '../../shared/models/Dictation';
import { Router } from '@angular/router';
import { Setting } from '../../shared/models/Setting';
import { SettingService } from '../../shared/services/setting.service';

@Component({
  selector: 'app-gas-clock',
  templateUrl: './gas-clock.component.html',
  styleUrls: ['./gas-clock.component.sass']
})
export class GasClockComponent implements OnInit {

  constructor(
    private addressService: AddressService,
    private dictationService: DictationService,
    private router: Router,
    private settingService: SettingService){}

  latestGasDictationValue?: number;
  globalAddressList?: Array<Address> = [];
  globalSelectedAddress?: Address;
  dictatingNewGas = new FormGroup({
    gasMeter: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getAllAddressByUserIdFunction();
    this.changeValuesOfSettings();
  }

  userSetting: Setting = {
    id: '',
    is_theme_dark: false,
    selected_language: '',
    user_id: ''
  };


  changeValuesOfSettings(){
    const loadingSubscription = this.settingService.getSettingByUserId().subscribe(selectedSetting =>{
      this.userSetting = selectedSetting[0];
      loadingSubscription.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }

  getAllAddressByUserIdFunction(){
    const user = JSON.parse((localStorage.getItem('user')) as string) as firebase.default.User;
    const userSubscription = this.addressService.getAllAddressedByUserId(user.uid as string).subscribe(addressList =>{
      for(let addressObject of addressList){
        this.globalAddressList?.push({...addressObject});
      }
      userSubscription.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }

  onSubmit(){
    if(this.dictatingNewGas.valid){
      const newDictation: Dictation = {
        id: '',
        address_id: this.globalSelectedAddress?.id as string,
        dictation_date: (new Date()).getTime(),
        gas_meter: (this.dictatingNewGas.get('gasMeter')?.value as any) as number,
        usedUpGas: 0
      }
      this.dictationService.create(newDictation).then(_ => {
        this.router.navigateByUrl('/main');
      }).catch(error =>{
        console.error(error);
      });

    }
  }

  selectAddress(selectedAddress: any){
    this.globalSelectedAddress = {...selectedAddress.value};
    if(this.globalSelectedAddress){
      const userSubscription = this.dictationService.getLatestDictationsByAddressId(this.globalSelectedAddress?.id as string).subscribe(latestDictationFromAddress =>{
        if(latestDictationFromAddress[0]){
          this.latestGasDictationValue = latestDictationFromAddress[0].gas_meter;
        }
        else{
          this.latestGasDictationValue = 0;
        }
        userSubscription.unsubscribe();
      }, error =>{
        console.error(error);
      });
    }
  }
}
