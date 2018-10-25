import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './authorization/auth.guard';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleGuard } from './authorization/role.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterRestaurantComponent } from './authorization/register-restaurant/register-restaurant.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockBackendService } from './shared/mock/mock-backend.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterRestaurantComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SharedModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockBackendService, { dataEncapsulation: false }
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'Authorization',
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: [
          'localhost:3001/auth/*',
        ]
      }
    })
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
