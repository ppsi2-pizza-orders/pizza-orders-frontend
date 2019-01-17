import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import {
  OrderService,
  RestaurantService,
  Restaurant,
  STATUS_NEW,
  STATUS_ACCEPTED,
  STATUS_REALIZATION,
  STATUS_DELIVERY,
  STATUS_FINISHED,
  AuthService
} from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  public orders: Array<Order>;
  public fiteredOrders: Array<Order>;
  public restaurant: Restaurant;
  public restaurantToken: string;
  private currentFilteredStatus = 0;
  private subscribtion: Subscription;

  constructor(
    private orderService: OrderService,
    private restaurantService: RestaurantService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscribtion = this.restaurantService.currentRestaurant
    .subscribe(restaurant => {
      this.restaurant = restaurant;
      this.restaurantToken = this.authService.getUser().getRestaurantToken(restaurant.id);
      this.orderService.getOrders(restaurant.id)
      .subscribe(orders => {
        this.orders = orders;
        this.fiteredOrders = orders;
        this.initEchoConnector();
      });
    });
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    window.Echo.leave(`restaurant.${this.restaurantToken}`);
  }

  initEchoConnector() {
    window.Echo.private(`restaurant.${this.restaurantToken}`).listen('OrderPlaced', (event) => {
      this.orders.push(event.order);
      this.filterOrders(this.currentFilteredStatus);
    });
  }

  filterOrders(status: number) {
    this.currentFilteredStatus = status;
    this.fiteredOrders = this.orders.filter(x => {
      if (status === 1) {
        return x.status === STATUS_NEW;
      } else if (status === 2) {
        return x.status === STATUS_ACCEPTED;
      } else if (status === 3) {
        return x.status === STATUS_REALIZATION;
      } else if (status === 4) {
        return x.status === STATUS_DELIVERY;
      } else if (status === 5) {
        return x.status === STATUS_FINISHED;
      }
      return true;
    });
  }

  onChangeStatus(orderToken: string) {
    this.orderService.nextStatusOrder(this.restaurant.id, orderToken).subscribe((order) => {
      const index = this.orders.findIndex(o => o.token === order.token);
      this.orders[index].status = order.status;
      this.filterOrders(this.currentFilteredStatus);
    });
  }

}
