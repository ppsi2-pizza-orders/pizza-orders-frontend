import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { User } from '../models';
import { SnackBarService } from './snack-bar.service';
import { ApiService } from './api.service';
import { API_URLS, RESTAURANT_ROLES } from '../const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$ = new BehaviorSubject<User>(this.userFromToken());
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private apiService: ApiService,
    private jwtHelper: JwtHelperService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private snackBar: SnackBarService) { }

  public isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      this.refreshToken();
    }
    return true;
  }

  public isAdmin(): boolean {
    return this.userFromToken().isAdmin();
  }

  public isRestaurantMember(id?: number): boolean {
    return this.userFromToken().isRestaurantMember(id);
  }

  public hasRestaurantRole(restaurantID: number, role: RESTAURANT_ROLES) {
    return this.userFromToken().getRestaurantRole(restaurantID) === role;
  }

  public login(email: string, password: string) {
    return this.apiService.post(API_URLS.Login, {'email': email, 'password': password}).pipe(
      map(data => {
        if (data && data['data']['token']) {
          return this.handleAuthData(data);
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
    this.isAuthenticated$.next(false);
    this.router.navigate([ '/' ]);
    this.snackBar.show('Wylogowano!');
  }

  public register(userData) {
    return this.apiService.post(API_URLS.RegisterUser, userData).pipe(
      map(data => {
        if (data && data['data']['token']) {
          return this.handleAuthData(data);
        }
      })
    );
  }

  private refreshToken() {
    this.apiService.post(API_URLS.RefreshToken).pipe(
      map(data => {
        if (data && data['data']['token']) {
          return this.handleAuthData(data);
        }
      })
    );
  }

  private userFromToken(): User {
    if (localStorage.getItem('token')) {
      return new User(this.jwtHelper.decodeToken(localStorage.getItem('token')).user);
    }
  }

  private sendSocialToken(token: string) {
    return this.apiService.post(API_URLS.SocialLogin, { 'access_token': token }).pipe(
      map(data => {
        if (data && data['data']['token']) {
          return this.handleAuthData(data);
        }
      })
    );
  }

  private handleAuthData(data: any) {
    localStorage.setItem('token', data['data']['token']);
    const user = this.userFromToken();
    this.currentUser$.next(user);
    this.isAuthenticated$.next(true);

    return user;
  }

}
