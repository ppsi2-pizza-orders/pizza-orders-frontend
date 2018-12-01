import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';

export const BackendEntryPoint_Login = environment.apiBaseUrl + '/auth/login';
export const BackendEntryPoint_SocialLogin = environment.apiBaseUrl + '/auth/facebook';
export const BackendEntryPoint_RegisterUser = environment.apiBaseUrl + '/auth/register';
export const BackendEntryPoint_RegisterRestaurant = environment.apiBaseUrl + '/auth/restaurant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private socialAuthService: SocialAuthService,
    private router: Router) { }

  public isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public currentUser() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token')).user;
  }

  public login(email: string, password: string) {
    return this.http.post(BackendEntryPoint_Login, {'email': email, 'password': password}).pipe(
      map(data => {
        if (data && data['data']['token']) {
          localStorage.setItem('token', data['data']['token']);
          this.isAuthenticatedSubject.next(true);
          return this.currentUser();
        }
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
    this.isAuthenticatedSubject.next(false);
    this.router.navigate([ '/' ]);
  }

  public register(userData) {
    return this.http.post(BackendEntryPoint_RegisterUser, userData).pipe(
      map(data => {
        if (data && data['data']['token']) {
          localStorage.setItem('token', data['data']['token']);
          this.isAuthenticatedSubject.next(true);
          return this.currentUser();
        }
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
      })
    );
  }

  private sendSocialToken(token: string) {
    return this.http.post(BackendEntryPoint_SocialLogin, { 'access_token': token }).pipe(
      map(data => {
        if (data && data['data']['token']) {
          localStorage.setItem('token', data['data']['token']);
          this.isAuthenticatedSubject.next(true);
          return this.currentUser();
        }
      })
    );
  }

}
