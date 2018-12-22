import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { routes } from './management.routing';
import { SelectRestaurantComponent } from './views/select-restaurant/select-restaurant.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RestaurantGuard } from '../../core/guards/restaurant.guard';
import { SharedModule } from 'src/app/shared';
import { OrdersComponent } from './views/orders/orders.component';
import { StoreComponent } from './views/store/store.component';
import { SettingsComponent } from './views/settings/settings.component';
import { CustomizationsComponent } from './views/customizations/customizations.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ManagementComponent,
    SelectRestaurantComponent,
    DashboardComponent,
    OrdersComponent,
    StoreComponent,
    SettingsComponent,
    CustomizationsComponent
  ],
  providers: [
    RestaurantGuard
  ]
})
export class ManagementModule { }
