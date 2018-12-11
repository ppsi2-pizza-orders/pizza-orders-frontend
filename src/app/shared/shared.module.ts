import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import { DropzoneDirective } from './directives/dropzone.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { MovableDirective } from './directives/movable.directive';
import { DroppableService } from './services/droppable.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestaurantService } from './services/restaurant.service';
import { UserService } from './services/user.service';
import { IngredientService } from './services/ingredient.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DialogService } from './services/dialog.service';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { RegisterRestaurantComponent } from './components/register-restaurant/register-restaurant.component';
import { AuthDialogComponent } from '../authorization/auth-dialog/auth-dialog.component';
import { OrderPreviewDialog } from './components/order-preview/order-preview.dialog';
import { SnackBarService } from './services/snack-bar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    DropzoneDirective,
    DroppableDirective,
    DraggableDirective,
    MovableDirective,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    DropzoneDirective,
    DroppableDirective,
    DraggableDirective,
    MovableDirective,
    AuthDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    RegisterRestaurantComponent,
    OrderPreviewDialog
  ],
  entryComponents: [
    AuthDialogComponent,
    RegisterRestaurantComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    OrderPreviewDialog
  ],
  providers: [
    DroppableService,
    RestaurantService,
    UserService,
    IngredientService,
    DialogService,
    SnackBarService
  ]
})
export class SharedModule { }
