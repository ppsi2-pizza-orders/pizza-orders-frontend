import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/animations/animations';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Restaurant } from 'src/app/shared/models/Restaurant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeAnimation]
})
export class MenuComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurant = this.restaurantService.currentRestaurant;
  }

}
