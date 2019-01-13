import { IngredientsComponent } from './views/ingredients/ingredients.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './views/admin.component';
import { RestaurantsComponent } from './views/restaurants/restaurants.component';
import { UsersComponent } from './views/users/users.component';
import { AdminGuard } from 'src/app/core/guards';

export const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
      { path: 'restaurants', component: RestaurantsComponent, canActivate: [AdminGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
      { path: 'ingredients', component: IngredientsComponent, canActivate: [AdminGuard] },
      { path: '**', redirectTo: '/' }
    ] }
];
