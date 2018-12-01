import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { patchParams } from '../utils';

export const BackendEntryPoint_GetAdminIngredients = environment.apiBaseUrl + '/admin/ingredients';
export const BackendEntryPoint_AddAdminIngredients = environment.apiBaseUrl + '/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  public deleteAdminIngredients(id: number){
    return this.http.delete(`${BackendEntryPoint_AddAdminIngredients}/${id}`);
  }

  public addAdminIngredients(data: FormData){
    return this.http.post(BackendEntryPoint_AddAdminIngredients, data);
  }

  public updateAdminIngredients(id: number, data: FormData){
    return this.http.post(`${BackendEntryPoint_AddAdminIngredients}/${id}`, data, patchParams);
  }

  public getAdminIngredients(params?) {
    return this.http.get(BackendEntryPoint_GetAdminIngredients, { 'params': params });
  }

}
