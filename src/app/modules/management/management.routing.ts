import { Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { SelectRestaurantComponent } from './views/select-restaurant/select-restaurant.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RESTAURANT_ROLES } from 'src/app/core';
import { ManagementGuard, RestaurantGuard } from 'src/app/core/guards';

export const routes: Routes = [
  { path: '', component: SelectRestaurantComponent },
  { path: ':id', component: ManagementComponent, canActivate: [RestaurantGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'ingredients',
        component: DashboardComponent,
        canActivate: [ManagementGuard],
        data: {
          expectedRole: RESTAURANT_ROLES.OWNER
        }
      }
    ]
  }
];
