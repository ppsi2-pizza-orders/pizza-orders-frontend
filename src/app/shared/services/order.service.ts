import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pizza } from '../models/Pizza';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private basket: Pizza[] = [];
  private basketItems = new BehaviorSubject<Pizza[]>(null);
  private basketPreviewVisible = new BehaviorSubject<boolean>(false);

  constructor() { }

  public isBasketPreviewVisible() {
    return this.basketPreviewVisible.asObservable();
  }

  public setBasketPreviewVisible(visible: boolean) {
    this.basketPreviewVisible.next(visible);
  }

  public addToBasket(pizza: Pizza) {
    this.basket.push(pizza);
    this.basketItems.next(this.basket);
    this.setBasketPreviewVisible(true);
  }

  public removeFromBasket(pizza: Pizza) {
    const index = this.basket.indexOf(pizza);
    this.basket.splice(index, 1);
    this.basketItems.next(this.basket);
    this.setBasketPreviewVisible(true);
  }

  public getBasketItems() {
    return this.basketItems.asObservable();
  }


}
