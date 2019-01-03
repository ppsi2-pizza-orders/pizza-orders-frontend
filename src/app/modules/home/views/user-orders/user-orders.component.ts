import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { OrderService } from 'src/app/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  public currentOrder: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    if (this.orderService.userOrderTokenExist()) {
      this.orderService.getOrder().subscribe(order => {
        this.currentOrder = order;
        this.initEchoConnector();
      });
    }
  }

  initEchoConnector() {
    window.Echo.connector.pusher.config.auth.headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    window.Echo.private(`order.${this.currentOrder.token}`).listen('OrderStatusChanged', (event) => {
      this.currentOrder.status = event.status;
    });
  }

  ngOnDestroy() {
    if (this.currentOrder) {
      window.Echo.leave(`order.${this.currentOrder.token}`);
    }
  }

}
