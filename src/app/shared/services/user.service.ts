import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export const BackendEntryPoint_GetAdminUsers = environment.apiBaseUrl + '/admin/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAdminUsers(params?) {
    return this.http.get(BackendEntryPoint_GetAdminUsers, { 'params': params });
  }

}
