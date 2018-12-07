import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/core';

@Component({
  selector: 'app-select-restaurant',
  templateUrl: './select-restaurant.component.html',
  styleUrls: ['./select-restaurant.component.scss']
})
export class SelectRestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
  }

}
