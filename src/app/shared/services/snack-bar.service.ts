import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  show(message) {
    this.snackBar.open(message, '',{
      duration: 1500,
      panelClass: 'snackBarStyle'
    });
  }
}
