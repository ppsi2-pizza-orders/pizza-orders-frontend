import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiInterceptor } from './interceptors/api-interceptor';
import {
  DialogService,
  DroppableService,
  IngredientService,
  RestaurantService,
  SnackBarService,
  ApiService
} from './services';
import {
  AdminGuard,
  AuthGuard,
  ManagementGuard,
  RestaurantMemberGuard,
  RestaurantRoleGuard
} from './guards';


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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import CoreModule modules in the AppModule only.`);
    }
  }
}
