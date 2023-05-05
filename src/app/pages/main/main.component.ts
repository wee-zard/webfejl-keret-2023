import { Component, OnInit } from '@angular/core';
import { Setting } from '../../shared/models/Setting';
import { SettingService } from '../../shared/services/setting.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  userSetting: Setting = {
    id: '',
    is_theme_dark: false,
    selected_language: '',
    user_id: ''
  };

  constructor(private settingService: SettingService){}

  ngOnInit(): void{
    const loadingSubscription = this.settingService.getSettingByUserId().subscribe(selectedSetting =>{
      this.userSetting = selectedSetting[0];
      loadingSubscription.unsubscribe();
    }, error =>{
      console.error(error);
    });
  }
}
