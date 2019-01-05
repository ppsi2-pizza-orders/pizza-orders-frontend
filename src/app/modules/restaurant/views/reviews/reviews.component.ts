import { Component, OnInit } from '@angular/core';
import { RestaurantService, DialogService, SnackBarService } from 'src/app/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public restaurantReviews = [];
  public restaurantID: number;

  constructor(
    private restaurantService: RestaurantService,
    private dialogService: DialogService,
    private snackBar: SnackBarService) { }

  ngOnInit() {
    this.restaurantService.currentRestaurant.subscribe(restaurant => {
      this.restaurantID = restaurant.id;
      if (restaurant.reviews) {
        this.restaurantReviews = restaurant.reviews;
      }
    });
  }

  rateRestaurant() {
    this.dialogService.rateDialog().subscribe(data => {
      if (data) {
        this.restaurantService.addReview(this.restaurantID, data)
        .subscribe(() => {
          this.snackBar.show('Wystawiono opinię');
          this.refreshReviews();
        });
      }
    });
  }

  refreshReviews() {
    this.restaurantService.getRestaurant(this.restaurantID)
    .subscribe(restaurant => {
      this.restaurantService.setCurrentRestaurant(restaurant.data);
      this.restaurantReviews = restaurant.data.reviews;
    });
  }

}
