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

  private currentUser$ = new BehaviorSubject<User>(this.getUser());
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

  public getObservableUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public getUser(): User {
    if (localStorage.getItem('token')) {
      const userData = this.jwtHelper.decodeToken(localStorage.getItem('token')).user;
      return new User(userData);
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  public tokenExists(): boolean {
    return !!localStorage.getItem('token');
  }

  public isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }

  public login(email: string, password: string): Observable<any> {
    return this.apiService.post(API_URLS.Login, {'email': email, 'password': password}).pipe(
      map(data => {
        if (data['data']['token']) {
          this.handleAuthData(data);
        }
      })
    );
  }

  public facebookLogin(): Observable<any> {
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

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
    this.router.navigate([ '/' ]);
    this.snackBar.show('Wylogowano!');
  }

  public register(userData): Observable<any> {
    return this.apiService.post(API_URLS.RegisterUser, userData).pipe(
      map(data => {
        if (data['data']['token']) {
          this.handleAuthData(data);
        }
      })
    );
  }

  public refreshToken(): Observable<any> {
    return this.apiService.post(API_URLS.RefreshToken).pipe(
      map(data => {
        if (data['data']['token']) {
          this.handleAuthData(data);
        }
      })
    );
  }

  private sendSocialToken(token: string): Observable<any> {
    return this.apiService.post(API_URLS.SocialLogin, { 'access_token': token }).pipe(
      map(data => {
        if (data['data']['token']) {
          this.handleAuthData(data);
        }
      })
    );
  }

  private handleAuthData(data: any): void {
    localStorage.setItem('token', data['data']['token']);
    window.Echo.connector.pusher.config.auth.headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    this.currentUser$.next(this.getUser());
    this.isAuthenticated$.next(true);
  }

}
