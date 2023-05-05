import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Setting } from '../../../shared/models/Setting';
import { SettingService } from '../../../shared/services/setting.service';

@Component({
  selector: 'app-address-successful',
  templateUrl: './address-successful.component.html',
  styleUrls: ['./address-successful.component.sass']
})
export class AddressSuccessfulComponent implements OnInit, OnDestroy {

  modificationOnAddress?: string;
  modificationArray?: Array<string>;
  loadingSubscription?: Subscription;

  constructor(
    private actRoute: ActivatedRoute,
    private settingService: SettingService){ }

  userSetting: Setting = {
    id: '',
    is_theme_dark: false,
    selected_language: '',
    user_id: ''
  };

  changeValuesOfSettings(){
    const loadingSubscription1 = this.settingService.getSettingByUserId().subscribe(selectedSetting =>{
      this.userSetting = selectedSetting[0];
      loadingSubscription1.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.readingDataFromUrl();
    this.changeValuesOfSettings();
  }

  readingDataFromUrl(){
    this.loadingSubscription = this.actRoute.params.subscribe((param: any) =>{
      this.modificationOnAddress = param.modificationOnAddress;
      if(this.modificationOnAddress && this.modificationOnAddress !== ''){
        this.modificationArray = this.modificationOnAddress.split(':');
      }
    }, error =>{
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
