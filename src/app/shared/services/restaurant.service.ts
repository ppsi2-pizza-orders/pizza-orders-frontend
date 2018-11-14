import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/Restaurant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const BackendEntryPoint_GetRestaurants = environment.apiBaseUrl + '/restaurants';
export const BackendEntryPoint_GetRestaurant = environment.apiBaseUrl + '/restaurant';
export const BackendEntryPoint_GetAutocomplete = environment.apiBaseUrl + '/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public currentRestaurant: Restaurant;

  constructor(private http: HttpClient) { }

  public getRestaurants(city: string, name: string): Observable<Restaurant[]> {
    const query = { searchCity: city, searchName: name };
    return this.http.post<Restaurant[]>(BackendEntryPoint_GetRestaurants, query).pipe(
      map(restaurants => {
        return restaurants['data'];
      })
    );
  }

  public getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(BackendEntryPoint_GetRestaurant + '/' + id).pipe(
      map(restaurant => {
        return restaurant['data'];
      })
    );
  }

  public getAutocomplete() {
    return this.http.get(BackendEntryPoint_GetAutocomplete).pipe(map(data => {
      data['cities'] = [...new Set(data['cities'])];
      data['names'] = [...new Set(data['names'])];
      return data;
    }));
  }

  public setCurrentRestaurant(restaurant: Restaurant) {
    this.currentRestaurant = restaurant;
  }
}