import { Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { SelectRestaurantComponent } from './views/select-restaurant/select-restaurant.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RESTAURANT_ROLES } from 'src/app/core';
import { ManagementGuard, RestaurantGuard } from 'src/app/core/guards';
import { SettingsComponent } from './views/settings/settings.component';
import { CustomizationsComponent } from './views/customizations/customizations.component';
import { StoreComponent } from './views/store/store.component';
import { OrdersComponent } from './views/orders/orders.component';

export const routes: Routes = [
  { path: '', component: SelectRestaurantComponent },
  { path: ':id', component: ManagementComponent, canActivate: [RestaurantGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [ManagementGuard],
        data: {
          expectedRole: [
            RESTAURANT_ROLES.OWNER,
            RESTAURANT_ROLES.COOK
          ]
        }
      },
      {
        path: 'store',
        component: StoreComponent,
        canActivate: [ManagementGuard],
        data: {
          expectedRole: [
            RESTAURANT_ROLES.OWNER,
            RESTAURANT_ROLES.MANAGER
          ]
        }
      },
      {
        path: 'customizations',
        component: CustomizationsComponent,
        canActivate: [ManagementGuard],
        data: {
          expectedRole: [RESTAURANT_ROLES.OWNER]
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [ManagementGuard],
        data: {
          expectedRole: [RESTAURANT_ROLES.OWNER]
        }
      }
    ]
  }
];
