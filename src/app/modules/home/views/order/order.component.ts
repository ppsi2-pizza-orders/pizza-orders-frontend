import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Product } from 'src/app/core/models/IProduct';
import { Observable } from 'rxjs';
import { OrderPickupComponent } from '../../components/order-pickup/order-pickup.component';
import { PIZZA_TYPES } from 'src/app/core/const';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/core/models/Order';
import { Pizza, DialogService } from 'src/app/core';
import { DialogTypes } from 'src/app/shared/components/info-dialog/info-dialog.component';

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
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.orderProducts = this.orderService.getOrderProducts();

    this.user = this.authService.getObservableUser();

    this.orderRestaurant = this.route.data.pipe(map(data => data.restaurant['data']));
  }

  public onSubmit() {
    if (this.orderPickup.isFormValid()) {
      const order = new Order({
        delivery_address: this.orderPickup.getDeliveryAddress(),
        phone_number: this.orderPickup.getPhone(),
        restaurant_id: this.orderPickup.getRestaurantID(),
        pizzas: this.convertOrderProducts()
      });
      this.orderService.sendNewOrder(order).subscribe(() => {
        this.orderService.clearOrderProducts();
        this.dialogService.infoDialog('Zamówienie zostało złożone! Dziękujemy!', '', DialogTypes.INFO)
        .subscribe(() => this.router.navigate(['user', 'orders']));
      });
    }
  }

  convertOrderProducts(): Array<object> {
    const convertedProducts = [];
    const subscription = this.orderProducts.subscribe(products => {
      products.forEach(product => {
        const pizza = new Pizza(product);
        if (!!pizza.type && pizza.type === PIZZA_TYPES.CUSTOM) {
          const ingredients = [];
          pizza.ingredients.forEach(ingredient => ingredients.push(ingredient.id));
          convertedProducts.push({'ingredients': ingredients});
        } else if (!!pizza.type && pizza.type === PIZZA_TYPES.MENU_CUSTOMIZED) {
          const ingredients = [];
          pizza.ingredients.forEach(ingredient => ingredients.push(ingredient.id));
          convertedProducts.push({'ingredients': ingredients, 'id': pizza.id});
        } else {
          convertedProducts.push({'id': pizza.id});
        }
      });
    });

    subscription.unsubscribe();
    return convertedProducts;
  }

}
