import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core/models/IProduct';
import { Restaurant } from 'src/app/core/models/Restaurant';

@Component({
  selector: 'app-summary-order',
  templateUrl: './summary-order.component.html',
  styleUrls: ['./summary-order.component.scss']
})
export class SummaryOrderComponent implements OnInit {
  @Input() public orderProducts: Product[];
  @Input() public orderRestaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

  public totalCost() {
    return this.orderProducts.reduce((cost: number, product: Product) => cost + parseFloat(product.price), 0);
  }

}
