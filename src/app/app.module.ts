import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthDialogComponent } from './authorization/auth-dialog/auth-dialog.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './authorization/auth.guard';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleGuard } from './authorization/role.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angular-6-social-login';
import { environment } from 'src/environments/environment';
import { OrderService } from './shared/services/order.service';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ApiInterceptor } from './api-interceptor';
import { InfoDialogComponent } from './shared/components/info-dialog/info-dialog.component';
import { RegisterRestaurantComponent } from './shared/components/register-restaurant/register-restaurant.component';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1852349398175426')
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AuthDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SharedModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: environment.whitelist,
        blacklistedRoutes: environment.blacklist
      }
    })
  ],
  entryComponents: [
    AuthDialogComponent,
    RegisterRestaurantComponent,
    ConfirmDialogComponent,
    InfoDialogComponent
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    OrderService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ApiInterceptor, 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
