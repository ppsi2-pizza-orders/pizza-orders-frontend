import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restaurant, RestaurantService, Pizza } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit, OnDestroy {

  public restaurant: Restaurant;
  private subscription: Subscription;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.subscription = this.restaurantService.currentRestaurant.subscribe(restaurant => this.restaurant = restaurant);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  add() {

  }

  edit(pizza: Pizza) {

  }


}
