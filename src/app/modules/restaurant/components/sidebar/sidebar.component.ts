import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../../../core/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
