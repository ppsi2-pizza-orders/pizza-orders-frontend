import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
        this.restaurantID = parseInt(storedRestaurantID, 10);
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

  public userOrderTokenExist(): boolean {
    return !!localStorage.getItem('order_token');
  }

  public sendNewOrder(order: Order): Observable<Order> {
    return this.apiService.post(API_URLS.SendOrder, order).pipe(map(data => {
      if (data.data.token) {
        localStorage.setItem('order_token', data.data.token);
        return new Order(data.data);
      }
    }));
  }

  public getOrder(): Observable<Order> {
    const token = localStorage.getItem('order_token');
    return this.apiService.get(`${API_URLS.GetOrder}/${token}`).pipe(
      map(data => {
        return new Order(data.data);
      })
    );
  }

  public getOrders(restaurantID: number): Observable<Order[]> {
    const url = `${API_URLS.GetRestaurant}/${restaurantID}/orders`;
    return this.apiService.get(url).pipe(
      map(data => {
        return data.data;
      })
    );
  }

  public nextStatusOrder(restaurantID: number, token: string): Observable<Order> {
    const url = `${API_URLS.GetRestaurant}/${restaurantID}/${API_URLS.SendOrder}/${token}/status/next`;
    return this.apiService.post(url).pipe(
      map(data => {
        return new Order(data.data);
      })
    );
  }

  private storeOrder() {
    localStorage.setItem(STORAGE_RESTAURANT_ID_KEY, String(this.restaurantID));
    localStorage.setItem(STORAGE_ORDER_KEY, JSON.stringify(this.order));
  }
}
