import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Restaurant } from 'src/app/shared/models/Restaurant';
import { Pizza } from 'src/app/shared/models/Pizza';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public restaurant: Restaurant;
  public pizzas: Pizza[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurant = this.restaurantService.currentRestaurant;
    this.pizzas = this.restaurant.pizzas;
  }

}
