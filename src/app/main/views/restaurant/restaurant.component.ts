import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/shared/models/Restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public restaurant: Restaurant;
  public loading = true;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit() {
    const restaurantId = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(restaurantId).subscribe(restaurant => {
      this.restaurant = restaurant['data'];
      this.restaurantService.setCurrentRestaurant(this.restaurant);
      this.loading = false;
    });
  }

}
