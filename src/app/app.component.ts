import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { Setting } from './shared/models/Setting';
import { SettingService } from './shared/services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;
  loadingSubscription?: Subscription;
  title = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private settingService: SettingService){ }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routes = this.router.config.map(conf => conf.path) as string[];
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) =>{
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if(this.routes.includes(currentPage)){
        this.page = currentPage;
      }
    });

    this.loadingSubscription = this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  changePage(selectedPage: string){
    this.router.navigateByUrl(selectedPage);
  }
  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
  onClose(event: any, sidenav: MatSidenav){
    if (event === true){
      sidenav.close();
    }
  }
  logout(_? : boolean){
    this.authService.logout().then(() => {
    }).catch(error => {
      console.error(error);
    });
  }

  userSetting: Setting = {
    id: '',
    is_theme_dark: false,
    selected_language: '',
    user_id: ''
  };
}
