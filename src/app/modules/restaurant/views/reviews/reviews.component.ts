import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public restaurantReviews = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.currentRestaurant.subscribe(restaurant => {
      this.restaurantReviews = restaurant.reviews;
    });
  }

}
