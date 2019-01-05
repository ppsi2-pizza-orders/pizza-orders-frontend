import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  DialogService,
  DroppableService,
  IngredientService,
  RestaurantService,
  SnackBarService,
  ApiService,
  ErrorHandlerService,
} from './services';
import {
  AdminGuard,
  AuthGuard,
  ManagementGuard,
  RestaurantMemberGuard,
  RestaurantRoleGuard
} from './guards';
import { RefreshTokenInterceptor } from './interceptors/refresh-token-interceptor';
import { JwtInterceptor } from '@auth0/angular-jwt';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    DroppableService,
    RestaurantService,
    IngredientService,
    DialogService,
    SnackBarService,
    ApiService,
    AuthGuard,
    AdminGuard,
    ManagementGuard,
    RestaurantMemberGuard,
    RestaurantRoleGuard,
    JwtInterceptor,
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import CoreModule modules in the AppModule only.`);
    }
  }
}
