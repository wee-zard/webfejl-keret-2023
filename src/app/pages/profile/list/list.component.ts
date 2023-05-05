import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Address } from '../../../shared/models/Address';
import { NewUser } from '../../../shared/models/NewUser';
import { AddressService } from '../../../shared/services/address.service';
import { Setting } from '../../../shared/models/Setting';
import { SettingService } from '../../../shared/services/setting.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  userObject?: NewUser;
  addressObject?: Array<Address> = [];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private settingService: SettingService){  }

  userSetting: Setting = {
    id: '',
    is_theme_dark: false,
    selected_language: '',
    user_id: ''
  };

  ngOnInit(): void {
    this.function1();
    this.function2();
  }

  function1(){
    const user = JSON.parse((localStorage.getItem('user')) as string) as firebase.default.User;
    const userSubscription1 = this.userService.getById(user.uid).subscribe( data =>{
      this.userObject = data;

      const userSubscription2 = this.addressService.getAllAddressedByUserId(this.userObject?.id as string).subscribe( addressList =>{
        for(let addressObject of addressList){
          this.addressObject?.push({...addressObject});
        }
        userSubscription2.unsubscribe();
      }, error =>{
        console.error(error);
      });
      userSubscription1.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }



  function2(){
    const loadingSubscription = this.settingService.getSettingByUserId().subscribe(selectedSetting =>{
      this.userSetting = selectedSetting[0];
      loadingSubscription.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }




}
