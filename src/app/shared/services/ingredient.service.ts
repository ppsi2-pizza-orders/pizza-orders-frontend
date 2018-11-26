import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../models/Ingredient';
import { map } from 'rxjs/operators';

export const BackendEntryPoint_GetAdminIngredients = environment.apiBaseUrl + '/admin/ingredients';
export const BackendEntryPoint_AddAdminIngredients = environment.apiBaseUrl + '/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  public deleteAdminIngredients(id: number){
    return this.http.delete(BackendEntryPoint_AddAdminIngredients +`/${id}`);
  }

  public addAdminIngredients(ingredient: FormData){
    return this.http.post(BackendEntryPoint_AddAdminIngredients, ingredient);
  }

  public updateAdminIngredients(ingredient: FormData){
    return this.http.patch(BackendEntryPoint_AddAdminIngredients, ingredient);
  }

  public getAdminIngredients(params?) {
    return this.http.get(BackendEntryPoint_GetAdminIngredients, { 'params': params });
  }

}
