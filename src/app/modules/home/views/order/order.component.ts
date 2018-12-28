import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Product } from 'src/app/core/models/IProduct';
import { Subscription, Observable } from 'rxjs';
import { OrderPickupComponent } from '../../components/order-pickup/order-pickup.component';
import { ORDER_PICKUP_TYPES } from 'src/app/core/const';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public orderProducts: Observable<Product[]>;
  public orderRestaurant: Observable<Restaurant>;
  public user: Observable<User>;
  @ViewChild('orderpickup') orderPickup: OrderPickupComponent;


  constructor(private orderService: OrderService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderProducts = this.orderService.getOrderProducts();

    this.user = this.authService.getCurrentUser();

    this.orderRestaurant = this.route.data.pipe(map(data => data.restaurant['data']));
  }

  public onSubmit() {
    if (this.orderPickup.orderPickupType === ORDER_PICKUP_TYPES.DELIVER) {
      if (this.orderPickup.isFormValid()) {}
    } else {

    }
  }

}
