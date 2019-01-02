import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {routes} from './app.routing';
import {RouterModule} from '@angular/router';
import {JwtModule} from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from 'angular-6-social-login';
import {environment} from 'src/environments/environment';
import {CoreModule} from './core';
import {SharedModule} from './shared';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('1852349398175426')
      }
    ]
  );
}

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: environment.whitelist,
        blacklistedRoutes: environment.blacklist
      }
    }),
    LeafletModule.forRoot()
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
