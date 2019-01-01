import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { routes } from './management.routing';
import { SelectRestaurantComponent } from './views/select-restaurant/select-restaurant.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared';
import { OrdersComponent } from './views/orders/orders.component';
import { StoreComponent } from './views/store/store.component';
import { EmployeesComponent } from './views/employees/employees.component';
import { RestaurantDataComponent } from './views/restaurant-data/restaurant-data.component';
import { RestaurantMenuComponent } from './views/restaurant-menu/restaurant-menu.component';

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
    EmployeesComponent,
    RestaurantDataComponent,
    RestaurantMenuComponent
  ],
  providers: [
  ]
})
export class ManagementModule { }
