import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { Restaurant } from 'src/app/core/models/Restaurant';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.currentRestaurant.subscribe(restaurant => {
      this.restaurant = restaurant;
    });
  }

}
