import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { Product } from 'src/app/shared/models/IProduct';

@Component({
  selector: 'app-basket-preview',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        padding: 0,
        opacity: 0,
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.1s ease')
      ]),
      transition('closed => open', [
        animate('0.2s ease')
      ]),
    ]),
  ],
  templateUrl: './basket-preview.component.html',
  styleUrls: ['./basket-preview.component.scss'],
})

export class BasketPreviewComponent implements OnInit {

  public isOpen: Observable<boolean>;
  public basketProducts: Product[] = [];

  @Output() itemInBasketCount = new EventEmitter<number>();

  constructor(private orderService: OrderService) { }

  public ngOnInit() {
    this.orderService.getBasketProducts().subscribe(items => {
      this.basketProducts = items;
      if (items) {
        this.itemInBasketCount.emit(items.length);
      }
    });
    this.isOpen = this.orderService.isBasketPreviewVisible();
  }

  public totalCost() {
    return this.basketProducts.reduce((cost: number, product: Product) => cost + product.price, 0);
  }

  public closeBasket() {
    this.orderService.setBasketPreviewVisible(false);
  }

  public removeProduct(product: Product) {
    this.orderService.removeFromBasket(product);
  }

  public addProduct(product: Product) {
    this.orderService.addToBasket(product);
  }
}
