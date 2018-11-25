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
  ],
  providers: [
    DroppableService,
    RestaurantService,
    UserService,
    IngredientService
  ]
})
export class SharedModule { }
