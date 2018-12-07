import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { AuthDialogComponent } from 'src/app/authorization/auth-dialog/auth-dialog.component';
import { InfoDialogComponent, DialogTypes } from '../components/info-dialog/info-dialog.component';
import { RegisterRestaurantComponent } from '../components/register-restaurant/register-restaurant.component';
import { OrderPreviewDialog } from '../components/order-preview/order-preview.dialog';
import { Product } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirmDialog(message: string){
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.message = message;
    
    return dialogRef.beforeClose();
  }

  public infoDialog(title: string, message: string, type: DialogTypes){
    let dialogRef: MatDialogRef<InfoDialogComponent>;
    dialogRef = this.dialog.open(InfoDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.type = type;

    return dialogRef.beforeClose();
  }

  public authDialog(){
    let dialogRef: MatDialogRef<AuthDialogComponent>;
    dialogRef = this.dialog.open(AuthDialogComponent);

    return dialogRef.beforeClose();
  }

  public orderPreviewDialog(products: Product[]){
    let config = new MatDialogConfig();
    config.autoFocus = false;
    config.restoreFocus = false;
    config.disableClose = true;
    let dialogRef: MatDialogRef<OrderPreviewDialog>;
    dialogRef = this.dialog.open(OrderPreviewDialog, config);
    dialogRef.componentInstance.orderProducts = products;

    return dialogRef.beforeClose();
  }

  public registerRestaurantDialog(){
    let dialogRef: MatDialogRef<RegisterRestaurantComponent>;
    dialogRef = this.dialog.open(RegisterRestaurantComponent);

    return dialogRef.beforeClose();
  }

  public closeAll(){
    this.dialog.closeAll();
  }

}
