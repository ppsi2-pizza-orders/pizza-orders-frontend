import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './views/admin.component';
import { MaterialModule } from '../../shared';
import { routes } from './admin.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { AdminDialogService } from './admin-dialog.service';
import { IngredientDialogComponent } from './components/ingredient-dialog/ingredient-dialog.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BaseTableViewComponent } from './views/base-table-view/base-table-view.component';
import { IngredientsComponent } from './views/ingredients/ingredients.component';
import { UsersComponent } from './views/users/users.component';
import { RestaurantsComponent } from './views/restaurants/restaurants.component';
import { AdminService } from './admin.service';

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
    IngredientDialogComponent,
    BaseTableViewComponent
  ],
  entryComponents: [
    IngredientDialogComponent
  ],
  providers: [
    AdminDialogService,
    AdminService
  ]
})
export class AdminModule { }
