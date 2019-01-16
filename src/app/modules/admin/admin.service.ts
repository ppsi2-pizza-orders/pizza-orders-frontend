import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services';
import { ADMIN_API_URLS } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService: ApiService) { }

  public deleteIngredients(id: number) {
    return this.apiService.delete(`${ADMIN_API_URLS.DeleteIngredient}/${id}`);
  }

  public addIngredients(data: FormData) {
    return this.apiService.post(ADMIN_API_URLS.AddIngredient, data);
  }

  public updateIngredients(id: number, data: FormData) {
    return this.apiService.path(`${ADMIN_API_URLS.AddIngredient}/${id}`, data);
  }

  public getIngredients(params?) {
    return this.apiService.get(ADMIN_API_URLS.GetIngredients, params);
  }

  public getUsers(params?) {
    return this.apiService.get(ADMIN_API_URLS.GetUsers, params);
  }

  public getRestaurants(params?) {
    return this.apiService.get(ADMIN_API_URLS.GetRestaurants, params);
  }

  public deleteRestaurant(id: number) {
    return this.apiService.delete(`${ADMIN_API_URLS.DeleteRestaurant}/${id}`);
  }

  public publishRestaurant(id: number) {
    return this.apiService.post(`${ADMIN_API_URLS.StatusRestaurant}/${id}/publish`, {});
  }

  public hideRestaurant(id: number) {
    return this.apiService.post(`${ADMIN_API_URLS.StatusRestaurant}/${id}/hide`, {});
  }
}
