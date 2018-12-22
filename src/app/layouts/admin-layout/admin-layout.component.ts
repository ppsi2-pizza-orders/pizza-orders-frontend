import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
