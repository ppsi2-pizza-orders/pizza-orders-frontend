import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material';
import {
  DraggableDirective,
  DroppableDirective,
  DropzoneDirective,
  MovableDirective
} from './directives';
import {AuthDialogComponent} from './components/auth-dialog/auth-dialog.component';
import {OrderPreviewComponent} from './components/order-preview/order-preview.dialog';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {RegisterRestaurantComponent} from './components/register-restaurant/register-restaurant.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RatingComponent} from './components/rating/rating.component';
import { RestaurantEditComponent } from './components/restaurant-edit/restaurant-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropzoneDirective,
    DroppableDirective,
    DraggableDirective,
    MovableDirective,
    NavbarComponent,
    RatingComponent
  ],
  declarations: [
    DropzoneDirective,
    DroppableDirective,
    DraggableDirective,
    MovableDirective,
    AuthDialogComponent,
    RegisterRestaurantComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    OrderPreviewComponent,
    NavbarComponent,
    RatingComponent,
    RestaurantEditComponent
  ],
  entryComponents: [
    AuthDialogComponent,
    RegisterRestaurantComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    OrderPreviewComponent,
    RestaurantEditComponent
  ],
})
export class SharedModule { }
