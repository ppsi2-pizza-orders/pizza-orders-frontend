import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/models/User';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

export const BackendEntryPoint_Login = environment.apiBaseUrl + 'auth/jwt/';
export const BackendEntryPoint_Register = environment.apiBaseUrl + 'register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    return this.http.post(BackendEntryPoint_Login + '/api/authenticate',
    {username: username, password: password }).pipe(
      map(user => {
        if (user && user['token']) {
            localStorage.setItem('token', JSON.stringify(user));
            return user;
        }
      }),
      catchError(error => {
        return Observable.throw(error);
      })
    );
  }

  register(userData: User) {
    return this.http.post(BackendEntryPoint_Register + `/api/register`, userData).pipe(
      map(user => {
        if (user && user['token']) {
            localStorage.setItem('token', JSON.stringify(user));
            return user;
        }
      }),
      catchError(error => {
        return Observable.throw(error);
      })
    );
  }

  logout() {
      localStorage.removeItem('token');
  }

}
