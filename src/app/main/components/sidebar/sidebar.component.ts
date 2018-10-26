import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/shared/models/Restaurant';

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

  ratingComponentClick(rate): void {
    console.log(rate);
  }

}
