import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../shared/material';
import { routes } from './admin.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RestaurantsComponent } from './views/restaurants/restaurants.component';
import { UsersComponent } from './views/users/users.component';
import { IngredientsComponent } from './views/ingredients/ingredients.component';
import { LogsComponent } from './views/logs/logs.component';
import { IngredientDialogComponent } from './components/ingredient-dialog/ingredient-dialog.component';
import { AdminDialogService } from './admin-dialog.service';
import { BaseTableViewComponent } from './views/base-table-view/base-table-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    RestaurantsComponent,
    UsersComponent,
    IngredientsComponent,
    LogsComponent,
    IngredientDialogComponent,
    BaseTableViewComponent
  ],
  entryComponents: [
    IngredientDialogComponent
  ],
  providers: [
    AdminDialogService
  ]
})
export class AdminModule { }
