import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() itemId: number;
  @Input() clickable = false;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.rating = Math.round(this.rating);
    this.inputName = this.itemId + '_rating';
  }
  onClick(rating: number): void {
    if (this.clickable) {
      this.rating = rating;
      this.ratingClick.emit({
        itemId: this.itemId,
        rating: rating
      });
    }
  }
}
