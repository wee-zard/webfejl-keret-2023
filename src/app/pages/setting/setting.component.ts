import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../shared/services/setting.service';
import { Setting } from '../../shared/models/Setting';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit {

  languageOption = [ 'magyar', 'english' ];

  userSetting: Setting = {
    id: '',
    is_theme_dark: false,
    selected_language: '',
    user_id: ''
  };

  constructor(private settingService: SettingService){}

  ngOnInit():void {
    this.changeValuesOfSettings();
  }


  reload(ertek: any, setting_option: string){
    switch(setting_option){
      case 'select':
        this.userSetting.selected_language = ertek.value;
        break;
      default:
        this.userSetting.is_theme_dark = ertek.checked;
        break;
    }
    this.settingService.update(this.userSetting).then(_ =>{
    }).catch(error => {
      console.error(error);
    });
  }



  changeValuesOfSettings(){
    const loadingSubscription = this.settingService.getSettingByUserId().subscribe(selectedSetting =>{
      this.userSetting = selectedSetting[0];
      loadingSubscription.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }
}
