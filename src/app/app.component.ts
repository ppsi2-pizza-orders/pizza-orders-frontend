import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Logger, AuthService} from './core/services/';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }
    if (!this.authService.isAuthenticated() && this.authService.tokenExists()) {
      this.authService.refreshToken().subscribe();
    }
    // window.Echo = new Echo({
    //   broadcaster: 'pusher',
    //   key: environment.pusherKey,
    //   wsHost: 'api.pizzaorders.pl',
    //   authEndpoint: 'https://api.pizzaorders.pl/broadcasting/auth',
    //   wsPort: 6001,
    //   wssPort: 6001,
    //   disableStats: false
    // });
    // window.Echo.connector.pusher.config.auth.headers = {
    //   'Authorization': 'Bearer ' + localStorage.getItem('token')
    // };
  }
}
