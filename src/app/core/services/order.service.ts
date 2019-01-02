import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models';
import { DialogService } from './dialog.service';
import { Order } from '../models/Order';
import { ApiService } from './api.service';
import { API_URLS } from '../const';
import { map } from 'rxjs/operators';

export const STORAGE_ORDER_KEY = 'orderProducts';
export const STORAGE_RESTAURANT_ID_KEY = 'restaurantID';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: Product[] = [];
  private restaurantID: number;
  private orderProducts = new BehaviorSubject<Product[]>(null);

  constructor(private dialogService: DialogService, private apiService: ApiService) {
    const storedProducts = localStorage.getItem(STORAGE_ORDER_KEY);
    const storedRestaurantID = localStorage.getItem(STORAGE_RESTAURANT_ID_KEY);
    if (storedProducts && storedRestaurantID) {
      try {
        this.order = JSON.parse(storedProducts);
        this.orderProducts.next(this.order);
        // tslint:disable-next-line:radix
        this.restaurantID = parseInt(storedRestaurantID);
      } catch {
        this.order = [];
      }
    }
  }

  public openOrderPreview() {
    this.dialogService.orderPreviewDialog(this.order).subscribe(products => {
      this.order = products;
      this.orderProducts.next(this.order);
      this.storeOrder();
    });
  }

  public addToOrder(product: Product, restaurant?: number) {
    if (restaurant) {
      if (this.restaurantID !== restaurant && this.order.length > 0) {
        this.order = [];
        this.restaurantID = restaurant;
      } else {
        this.restaurantID = restaurant;
      }
    }
    this.order.push(product);
    this.orderProducts.next(this.order);
    this.storeOrder();
    this.openOrderPreview();
  }

  public removeFromOrder(product: Product) {
    const index = this.order.indexOf(product);
    this.order.splice(index, 1);
    this.orderProducts.next(this.order);
    this.storeOrder();
  }

  public clearOrderProducts() {
    this.order = [];
    this.orderProducts.next(this.order);
    this.storeOrder();
  }

  public getOrderProducts() {
    return this.orderProducts.asObservable();
  }

  public getOrderRestaurantID() {
    return this.restaurantID;
  }

  public sendNewOrder(order: Order) {
    return this.apiService.post(API_URLS.SendOrder, order).pipe(map(data => {
      if (data.token) {
        localStorage.setItem('order_token', data.token);
      }
    }));
  }

  private storeOrder() {
    localStorage.setItem(STORAGE_RESTAURANT_ID_KEY, String(this.restaurantID));
    localStorage.setItem(STORAGE_ORDER_KEY, JSON.stringify(this.order));
  }
}
