import { Injectable } from '@angular/core';
import { Restaurant, OrderService, RestaurantService } from 'src/app/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantResolverService implements Resolve<Restaurant> {

  constructor(
    private orderService: OrderService,
    private restaurantSevice: RestaurantService) { }

  resolve(): Observable<any> {
    return this.restaurantSevice.getRestaurant(this.orderService.getOrderRestaurantID());
  }

}
