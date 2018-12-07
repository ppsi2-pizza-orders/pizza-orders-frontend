import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private basket: Product[] = [];
  private restaurantID: number;
  private basketProducts = new BehaviorSubject<Product[]>(null);
  private basketPreviewVisible = new BehaviorSubject<boolean>(false);

  constructor() { }

  public isBasketPreviewVisible() {
    return this.basketPreviewVisible.asObservable();
  }

  public setBasketPreviewVisible(visible: boolean) {
    this.basketPreviewVisible.next(visible);
  }

  public addToBasket(product: Product, restaurant?: number) {
    if (restaurant) {
      if (this.restaurantID !== restaurant && this.basket.length > 0) {
        this.basket = [];
        this.restaurantID = restaurant;
      } else {
        this.restaurantID = restaurant;
      }
    }
    this.basket.push(product);
    this.basketProducts.next(this.basket);
    this.setBasketPreviewVisible(true);
  }

  public removeFromBasket(product: Product) {
    const index = this.basket.indexOf(product);
    this.basket.splice(index, 1);
    this.basketProducts.next(this.basket);
    this.setBasketPreviewVisible(true);
  }

  public getBasketProducts() {
    return this.basketProducts.asObservable();
  }


}
