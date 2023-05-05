import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddressDictation } from '../../shared/models/AddressDictation';
import { Setting } from '../../shared/models/Setting';
import { SettingService } from '../../shared/services/setting.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass']
})
export class AddressComponent implements OnInit {

  addressObject?: Array<AddressDictation>;
  userAddressesDictationsObject?: Array<AddressDictation>;

  @Output() settingEmitter: EventEmitter<any> = new EventEmitter();

  loadObject(addDicList: any){
    this.userAddressesDictationsObject = addDicList;
  }

  userSetting: Setting = {
    id: '',
    is_theme_dark: false,
    selected_language: '',
    user_id: ''
  };

  constructor(private settingService: SettingService){  }

  ngOnInit(): void {
    const loadingSubscription = this.settingService.getSettingByUserId().subscribe(selectedSetting =>{
      this.userSetting = selectedSetting[0];
      loadingSubscription.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }
}
