import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Logger} from './core/services';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  ngOnInit() {
      if (environment.production) {
        Logger.enableProductionMode();
      }
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: environment.pusherKey,
        wsHost: 'api.pizzaorders.pl',
        authEndpoint: 'https://api.pizzaorders.pl/broadcasting/auth',
        wsPort: 6001,
        wssPort: 6001,
        disableStats: false
      });
  }
}
