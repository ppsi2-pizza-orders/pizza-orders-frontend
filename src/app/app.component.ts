import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Logger} from './core/services';

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
  }
}
