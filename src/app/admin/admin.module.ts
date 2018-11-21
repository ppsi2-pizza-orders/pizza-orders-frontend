import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../shared/material';
import { routes } from './admin.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { UsersComponent } from './pages/users/users.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { LogsComponent } from './pages/logs/logs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    RestaurantsComponent,
    UsersComponent,
    IngredientsComponent,
    LogsComponent,
  ]
})
export class AdminModule { }
