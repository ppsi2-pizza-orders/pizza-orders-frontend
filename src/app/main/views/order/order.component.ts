import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Product } from 'src/app/shared/models/IProduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public orderProducts: Product[];
  public payments = [
    {img: 'assets/blik.png'},
    {img: 'assets/visa-mastercard.png'},
    {img: 'assets/payu.jpg'},
    {img: 'assets/cash.png'}
  ];
  private subscribtion : Subscription;


  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.subscribtion = this.orderService.getOrderProducts().subscribe(products =>{
      this.orderProducts = products;
    });
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
