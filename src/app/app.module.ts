import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthDialogComponent } from './authorization/auth-dialog/auth-dialog.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './authorization/auth.guard';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleGuard } from './authorization/role.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterRestaurantComponent } from './authorization/register-restaurant/register-restaurant.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockBackendService } from './shared/mock/mock-backend.service';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angular-6-social-login';
import { environment } from 'src/environments/environment';

export function tokenGetter() {
  return `Bearer ${localStorage.getItem('token')}`;
}

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
    RegisterRestaurantComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SharedModule,
    SocialLoginModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockBackendService, { dataEncapsulation: false }
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'Authorization',
        whitelistedDomains: environment.whitelist,
        blacklistedRoutes: environment.blacklist
      }
    })
  ],
  entryComponents: [
    AuthDialogComponent,
    RegisterRestaurantComponent
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
