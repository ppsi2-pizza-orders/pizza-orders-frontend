import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import { DropzoneDirective } from './directives/dropzone.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { MovableDirective } from './directives/movable.directive';
import { DroppableService } from './services/droppable.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestaurantService } from './services/restaurant.service';
import { BasketPreviewComponent } from './components/basket-preview/basket-preview.component';

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
    NavbarComponent,
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
    NavbarComponent,
    BasketPreviewComponent
  ],
  providers: [
    DroppableService,
    RestaurantService
  ]
})
export class SharedModule { }
