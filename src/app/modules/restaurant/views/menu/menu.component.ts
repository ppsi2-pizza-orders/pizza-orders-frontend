import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { Pizza } from 'src/app/core/models/Pizza';
import { OrderService } from 'src/app/core/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  public restaurant: Restaurant;
  public subscription: Subscription;

  constructor(private restaurantService: RestaurantService, private orderService: OrderService) { }

  public ngOnInit() {
    this.subscription = this.restaurantService.currentRestaurant
    .subscribe(restaurant => this.restaurant = restaurant);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public addToOrder(pizza: Pizza) {
    this.orderService.addToOrder(pizza, this.restaurant.id);
  }

}
