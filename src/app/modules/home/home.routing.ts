import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserOrdersComponent } from './views/user-orders/user-orders.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { OrderComponent } from './views/order/order.component';
import { AuthGuard } from '../../core/guards';
import { RestaurantResolverService } from './restaurant-resolver.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', children: [
      { path: 'orders', component: UserOrdersComponent },
      { path: 'data', component: UserSettingsComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard],
    resolve: {
      restaurant: RestaurantResolverService
    }
  }
];
