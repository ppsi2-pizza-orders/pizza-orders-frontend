import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeAnimation]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
