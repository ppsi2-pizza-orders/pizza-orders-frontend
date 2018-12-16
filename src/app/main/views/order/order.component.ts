import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Product } from 'src/app/shared/models/IProduct';
import { Subscription } from 'rxjs';
import { OrderPickupComponent } from '../../components/order-pickup/order-pickup.component';
import { ORDER_PICKUP_TYPES } from 'src/app/shared/const';
import { Restaurant } from 'src/app/shared/models/Restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/authorization/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public orderProducts: Product[];
  public orderRestaurant: Restaurant;
  public user: User;
  private subscribtion : Subscription;
  @ViewChild('orderpickup') orderPickup: OrderPickupComponent;


  constructor(private orderService: OrderService, 
              private restaurantSevice: RestaurantService,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscribtion = this.orderService.getOrderProducts().subscribe(products =>{
      this.orderProducts = products;
    });

    this.subscribtion.add(this.authService.getCurrentUser().subscribe(user =>this.user = user));
    
    this.restaurantSevice.getRestaurant(this.orderService.getOrderRestaurantID())
    .subscribe(restaurant => this.orderRestaurant = restaurant['data']);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  public onSubmit(){
    if(this.orderPickup.orderPickupType === ORDER_PICKUP_TYPES.DELIVER){
      if(this.orderPickup.isFormValid()){
      
      }
    }else{

    }
  }

}
