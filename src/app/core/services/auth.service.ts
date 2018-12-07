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
import { API_URLS } from '../const';

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
    return token && !this.jwtHelper.isTokenExpired(token);
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

  public userFromToken() {
    if (localStorage.getItem('token')) {
      return this.jwtHelper.decodeToken(localStorage.getItem('token')).user;
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