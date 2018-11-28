import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private config = new MatDialogConfig();

  constructor(private dialog: MatDialog) { }

  public confirmDialog(message: string){
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.message = message;
    
    return dialogRef.beforeClose();
  }

}
