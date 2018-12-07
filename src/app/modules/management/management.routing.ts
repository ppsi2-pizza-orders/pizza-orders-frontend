import { Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { SelectRestaurantComponent } from './views/select-restaurant/select-restaurant.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RestaurantGuard } from './restaurant.guard';

export const routes: Routes = [
  { path: '', component: SelectRestaurantComponent },
  { path: ':id', component: ManagementComponent, // canActivate: [RestaurantGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];
