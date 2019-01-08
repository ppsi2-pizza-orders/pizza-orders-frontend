import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AuthDialogComponent } from 'src/app/shared/components/auth-dialog/auth-dialog.component';
import { Product, Restaurant, Pizza } from '../models';
import {OrderPreviewComponent} from '../../shared/components/order-preview/order-preview.dialog';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogTypes, InfoDialogComponent} from '../../shared/components/info-dialog/info-dialog.component';
import {RegisterRestaurantComponent} from '../../shared/components/register-restaurant/register-restaurant.component';
import { RestaurantEditComponent } from 'src/app/shared/components/restaurant-edit/restaurant-edit.component';
import { RateDialogComponent } from 'src/app/shared/components/rate-dialog/rate-dialog.component';
import { AddEditPizzaComponent } from 'src/app/shared/components/add-edit-pizza/add-edit-pizza.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirmDialog(message: string) {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.message = message;

    return dialogRef.beforeClose();
  }

  public infoDialog(title: string, message: string, type: DialogTypes) {
    let dialogRef: MatDialogRef<InfoDialogComponent>;
    dialogRef = this.dialog.open(InfoDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.type = type;

    return dialogRef.beforeClose();
  }

  public authDialog(canRedirect = true) {
    let dialogRef: MatDialogRef<AuthDialogComponent>;
    dialogRef = this.dialog.open(AuthDialogComponent);
    dialogRef.componentInstance.canRedirect = canRedirect;

    return dialogRef.beforeClose();
  }

  public orderPreviewDialog(products: Product[]) {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.restoreFocus = false;
    config.disableClose = true;
    config.maxHeight = '70vh';
    let dialogRef: MatDialogRef<OrderPreviewComponent>;
    dialogRef = this.dialog.open(OrderPreviewComponent, config);
    dialogRef.componentInstance.orderProducts = products;

    return dialogRef.beforeClose();
  }

  public registerRestaurantDialog() {
    let dialogRef: MatDialogRef<RegisterRestaurantComponent>;
    dialogRef = this.dialog.open(RegisterRestaurantComponent);

    return dialogRef.beforeClose();
  }

  public editRestaurantDialog(restaurant: Restaurant) {
    let dialogRef: MatDialogRef<RestaurantEditComponent>;
    dialogRef = this.dialog.open(RestaurantEditComponent);
    dialogRef.componentInstance.restaurant = restaurant;

    return dialogRef.beforeClose();
  }

  addPizza() {
    let dialogRef: MatDialogRef<AddEditPizzaComponent>;
    dialogRef = this.dialog.open(AddEditPizzaComponent);

    return dialogRef.beforeClose();
  }

  editPizza(pizza: Pizza) {
    let dialogRef: MatDialogRef<AddEditPizzaComponent>;
    dialogRef = this.dialog.open(AddEditPizzaComponent);
    dialogRef.componentInstance.pizza = pizza;

    return dialogRef.beforeClose();
  }

  public rateDialog() {
    let dialogRef: MatDialogRef<RateDialogComponent>;
    dialogRef = this.dialog.open(RateDialogComponent);

    return dialogRef.beforeClose();
  }

  public closeAll() {
    this.dialog.closeAll();
  }

}
