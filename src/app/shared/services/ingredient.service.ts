import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export const BackendEntryPoint_GetAdminIngredients = environment.apiBaseUrl + '/admin/ingredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  public getAdminUsers(params?) {
    return this.http.get(BackendEntryPoint_GetAdminIngredients, { 'params': params });
  }

}
