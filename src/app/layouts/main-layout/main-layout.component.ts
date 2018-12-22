import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
