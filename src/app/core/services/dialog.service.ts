import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AuthDialogComponent } from 'src/app/shared/components/auth-dialog/auth-dialog.component';
import { Product } from '../models';
import {OrderPreviewComponent} from '../../shared/components/order-preview/order-preview.dialog';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogTypes, InfoDialogComponent} from '../../shared/components/info-dialog/info-dialog.component';
import {RegisterRestaurantComponent} from '../../shared/components/register-restaurant/register-restaurant.component';

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

  public authDialog() {
    let dialogRef: MatDialogRef<AuthDialogComponent>;
    dialogRef = this.dialog.open(AuthDialogComponent);

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

  public closeAll() {
    this.dialog.closeAll();
  }

}
