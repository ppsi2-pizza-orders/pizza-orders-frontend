import { Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { SelectRestaurantComponent } from './views/select-restaurant/select-restaurant.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RestaurantRoles } from 'src/app/core';
import { RestaurantMemberGuard, RestaurantRoleGuard } from 'src/app/core/guards';
import { StoreComponent } from './views/store/store.component';
import { OrdersComponent } from './views/orders/orders.component';
import { EmployeesComponent } from './views/employees/employees.component';
import { RestaurantDataComponent } from './views/restaurant-data/restaurant-data.component';
import { RestaurantMenuComponent } from './views/restaurant-menu/restaurant-menu.component';

export const routes: Routes = [
  { path: '', component: SelectRestaurantComponent },
  { path: ':id', component: ManagementComponent, canActivate: [RestaurantMemberGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [RestaurantRoleGuard],
        data: {
          expectedRoles: [
            RestaurantRoles.Owner,
            RestaurantRoles.Cook
          ]
        }
      },
      {
        path: 'store',
        component: StoreComponent,
        canActivate: [RestaurantRoleGuard],
        data: {
          expectedRoles: [
            RestaurantRoles.Owner,
            RestaurantRoles.Manager
          ]
        }
      },
      {
        path: 'restaurant-menu',
        component: RestaurantMenuComponent,
        canActivate: [RestaurantRoleGuard],
        data: {
          expectedRoles: [RestaurantRoles.Owner]
        }
      },
      {
        path: 'restaurant-data',
        component: RestaurantDataComponent,
        canActivate: [RestaurantRoleGuard],
        data: {
          expectedRoles: [RestaurantRoles.Owner]
        }
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [RestaurantRoleGuard],
        data: {
          expectedRoles: [RestaurantRoles.Owner]
        }
      }
    ]
  }
];
