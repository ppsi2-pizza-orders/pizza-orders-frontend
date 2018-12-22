import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { Pizza } from 'src/app/core/models/Pizza';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService, private orderService: OrderService) { }

  public ngOnInit() {
    this.restaurantService.currentRestaurant.subscribe(restaurant => {
      this.restaurant = restaurant;
    });
  }

  public addToOrder(pizza: Pizza) {
    this.orderService.addToOrder(pizza, this.restaurant.id);
  }

}
