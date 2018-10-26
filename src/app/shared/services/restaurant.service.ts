import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/Restaurant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// export const BackendEntryPoint_Login = environment.apiBaseUrl + 'auth/jwt/';
export const BackendEntryPoint_GetRestaurants = 'api/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public currentRestaurant: Restaurant;

  constructor(private http: HttpClient) { }

  getRestaurants(city: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(BackendEntryPoint_GetRestaurants).pipe(
      map(restaurants => restaurants.filter(restaurant => restaurant.city === city))
    );
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(BackendEntryPoint_GetRestaurants + '/' + id);
  }

  setCurrentRestaurant(restaurant: Restaurant) {
    this.currentRestaurant = restaurant;
  }
}
