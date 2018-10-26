import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/models/User';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider
} from 'angular-6-social-login';

export const BackendEntryPoint_Login = environment.apiBaseUrl + 'auth/jwt';
export const BackendEntryPoint_SocialLogin = environment.apiBaseUrl + 'auth/fb';
export const BackendEntryPoint_RegisterUser = environment.apiBaseUrl + 'auth/register';
export const BackendEntryPoint_RegisterRestaurant = environment.apiBaseUrl + 'auth/restaurant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private socialAuthService: SocialAuthService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(email: string, password: string) {
    return this.http.post(BackendEntryPoint_Login,
      { email: email, password: password }).pipe(
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

  public facebookLogin() {
    let socialPlatformProvider;
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

    return from(
      this.socialAuthService.signIn(socialPlatformProvider)
    ).pipe(
      switchMap(userData => {
        return this.sendSocialToken(userData.token);
      })
    );
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public register(userData: User) {
    return this.http.post(BackendEntryPoint_RegisterUser, userData).pipe(
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

  public registerRestaurant(restaurantData) {
    return this.http.post(BackendEntryPoint_RegisterRestaurant, restaurantData).pipe(
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

  private sendSocialToken(token: string) {
    return this.http.post(BackendEntryPoint_SocialLogin, {'access_token' : token}).pipe(
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

}
