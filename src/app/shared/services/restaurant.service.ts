import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/Restaurant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// export const BackendEntryPoint_Login = environment.apiBaseUrl + 'auth/jwt/';
export const BackendEntryPoint_GetRestaurants = 'api/restaurant';
export const BackendEntryPoint_GetAutocomplete = 'api/autocomplete';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public currentRestaurant: Restaurant;

  constructor(private http: HttpClient) { }

  getRestaurants(property: string, value: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(BackendEntryPoint_GetRestaurants).pipe(
      map(restaurants => restaurants.filter(restaurant => restaurant[property].toUpperCase().includes(value.toUpperCase())))
    );
  }

  getAutocomplete() {
    return this.http.get(BackendEntryPoint_GetAutocomplete);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(BackendEntryPoint_GetRestaurants + '/' + id);
  }

  setCurrentRestaurant(restaurant: Restaurant) {
    this.currentRestaurant = restaurant;
  }
}
