import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { routes } from './management.routing';
import { SelectRestaurantComponent } from './views/select-restaurant/select-restaurant.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RestaurantGuard } from './restaurant.guard';
import { SharedModule } from 'src/app/shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ManagementComponent,
    SelectRestaurantComponent,
    DashboardComponent
  ],
  providers: [
    RestaurantGuard
  ]
})
export class ManagementModule { }
