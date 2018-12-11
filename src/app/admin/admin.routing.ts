import { IngredientsComponent } from './views/ingredients/ingredients.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RestaurantsComponent } from './views/restaurants/restaurants.component';
import { LogsComponent } from './views/logs/logs.component';
import { UsersComponent } from './views/users/users.component';

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
