import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

export class ReviewData {
  base_rating: number;
  ingredients_rating: number;
  delivery_time_rating: number;
  comment: string;
}
@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss']
})
export class RateDialogComponent implements OnInit {
  public reviewData = new ReviewData();
  public formError = false;

  constructor(
    private dialogRef: MatDialogRef<RateDialogComponent>) { }

  ngOnInit() {
  }

  onConfirm() {
    if (!this.isValid()) {
      this.formError = true;
      return;
    }

    this.dialogRef.close(this.reviewData);
  }

  setRate(event) {
    switch (event.itemId) {
      case 1: this.reviewData.ingredients_rating = event.rating; break;
      case 2: this.reviewData.delivery_time_rating = event.rating; break;
      case 3: this.reviewData.base_rating = event.rating; break;
    }
    this.formError = false;
  }

  isValid() {
    return this.reviewData.hasOwnProperty('base_rating') &&
    this.reviewData.hasOwnProperty('ingredients_rating') &&
    this.reviewData.hasOwnProperty('delivery_time_rating');
  }

}
