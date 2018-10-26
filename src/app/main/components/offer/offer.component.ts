import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Restaurant } from 'src/app/shared/models/Restaurant';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurant = this.restaurantService.currentRestaurant;
  }

}
