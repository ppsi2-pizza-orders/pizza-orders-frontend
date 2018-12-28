import { Component, OnInit } from '@angular/core';
import { RestaurantService, AuthService, Restaurant } from 'src/app/core';

@Component({
  selector: 'app-select-restaurant',
  templateUrl: './select-restaurant.component.html',
  styleUrls: ['./select-restaurant.component.scss']
})
export class SelectRestaurantComponent implements OnInit {
  public userRestaurants: object[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userRestaurants = this.authService.getUser().restaurants;
  }

}
