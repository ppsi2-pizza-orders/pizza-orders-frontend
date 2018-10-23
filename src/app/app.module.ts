import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './authorization/auth.guard';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    AdminModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SharedModule,
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
  providers: [AuthGuard, {
    provide: MatDialogRef,
    useValue: {}
  }, {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
