import { Injectable } from '@angular/core';
import { Restaurant, Pizza, Ingredient } from '../models';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { ApiService } from './api.service';
import { API_URLS} from '../const';
import { map } from 'rxjs/operators';
import { ReviewData } from 'src/app/shared/components/rate-dialog/rate-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private currentRestaurant$ = new BehaviorSubject<Restaurant>(null);
  public currentRestaurant = this.currentRestaurant$.asObservable();

  constructor(private apiService: ApiService) { }

  public getRestaurants(city?: string, name?: string): Observable<Restaurant[]> {
    const query = { searchCity: city, searchName: name };
    return this.apiService.post(API_URLS.GetRestaurants, query);
  }

  public getRestaurant(id: number): Observable<any> {
    return this.apiService.get(`${API_URLS.GetRestaurant}/${id}`);
  }

  public getAutocomplete() {
    return this.apiService.get(API_URLS.GetAutocomplete);
  }

  public addRestaurant(restaurant: Restaurant): Observable<any> {
    return this.apiService.post(API_URLS.AddRestaurant, restaurant);
  }

  public uploadRestaurant(restaurantID: number, uploadData: FormData): Observable<Restaurant> {
    return this.apiService.path(`${API_URLS.AddRestaurant}/${restaurantID}`, uploadData).pipe(
      map(data => {
        return new Restaurant(data.data);
      })
    );
  }

  public setCurrentRestaurant(restaurant: Restaurant) {
    this.currentRestaurant$.next(restaurant);
  }

  public grantUserRole(email: string, role: number, restaurantID: number) {
    const grantURL = `${API_URLS.AddRestaurant}/${restaurantID}/grant`;
    const data = { 'email': email, 'role': role };

    return this.apiService.post(grantURL, data);
  }

  public removeUser(userID: number, restaurantID: number) {
    const url = `${API_URLS.AddRestaurant}/${restaurantID}/revoke/${userID}`;

    return this.apiService.delete(url);
  }

  public addReview(restaurantID: number, data: ReviewData): Observable<any> {
    const url = `${API_URLS.AddRestaurant}/${restaurantID}/review`;
    return this.apiService.post(url, data);
  }

  public addPizzaToMenu(restaurantID: number, pizza: Pizza) {
    const url = `${API_URLS.AddPizza}/${restaurantID}/pizza`;
    return this.apiService.post(url, pizza);
  }

  public editMenuPizza(restaurantID: number, pizzaID: number, pizza: Pizza) {
    const url = `${API_URLS.EditPizza}/${restaurantID}/pizza/${pizzaID}`;
    return this.apiService.path(url, pizza);
  }

  public removeMenuPizza(restaurantID: number, pizzaID: number) {
    const url = `${API_URLS.EditPizza}/${restaurantID}/pizza/${pizzaID}`;
    return this.apiService.delete(url);
  }

  public getRestaurantIngredients(restaurantID: number) {
    return this.apiService.get(`${API_URLS.AddRestaurant}/${restaurantID}/ingredients`);
  }

  public addIngredient(restaurantID: number, ingredient: Ingredient) {
    const url = `${API_URLS.AddPizza}/${restaurantID}/manage`;
    return this.apiService.post(url, ingredient);
  }

  public publishRestaurant(id: number) {
    return this.apiService.post(`${API_URLS.AddRestaurant}/${id}/publish/request`);
  }

  public hideRestaurant(id: number) {
    return this.apiService.post(`${API_URLS.AddRestaurant}/${id}/publish/cancel`);
  }

  public removeRestaurant(id: number) {
    return this.apiService.delete(`${API_URLS.AddRestaurant}/${id}`);
  }
}
