import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Restaurant } from '../../../core/models';
import { RestaurantService } from '../../../core/services';
import { fadeRoute } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  animations: [ fadeRoute ]
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

}
