import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { LogsComponent } from './pages/logs/logs.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'logs', component: LogsComponent },
      { path: '**', redirectTo: '/' }
    ] }
];
