import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ch-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [ './confirm-dialog.component.scss' ],
})

export class ConfirmDialogComponent {
  public message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
}
