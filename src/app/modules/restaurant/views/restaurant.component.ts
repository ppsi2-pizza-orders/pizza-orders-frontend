import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../../core/models';
import { RestaurantService } from '../../../core/services';

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
      console.log(restaurant);
    });
  }

}
