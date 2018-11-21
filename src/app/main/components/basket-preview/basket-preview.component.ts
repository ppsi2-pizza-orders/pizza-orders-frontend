import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { Pizza } from 'src/app/shared/models/Pizza';
import { OrderService } from 'src/app/shared/services/order.service';


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
  public basketItems: Pizza[] = [];

  @Output() itemInBasketCount = new EventEmitter<number>();

  constructor(private orderService: OrderService) { }

  public ngOnInit() {
    this.orderService.getBasketItems().subscribe(items => {
      this.basketItems = items;
      if (items) {
        this.itemInBasketCount.emit(items.length);
      }
    });
    this.isOpen = this.orderService.isBasketPreviewVisible();
  }

  public totalCost() {
    return this.basketItems.reduce((cost: number, pizza: Pizza) => cost + pizza.price, 0);
  }

  public close() {
    this.orderService.setBasketPreviewVisible(false);
  }

  public remove(pizza: Pizza) {
    this.orderService.removeFromBasket(pizza);
  }

  public add(pizza: Pizza) {
    this.orderService.addToBasket(pizza);
  }
}
