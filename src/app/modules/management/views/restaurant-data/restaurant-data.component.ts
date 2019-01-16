import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restaurant, RestaurantService, DialogService, SnackBarService } from 'src/app/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-data',
  templateUrl: './restaurant-data.component.html',
  styleUrls: ['./restaurant-data.component.scss']
})
export class RestaurantDataComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(
    private restaurantService: RestaurantService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    const restaurantID = this.route.parent.snapshot.params['id'];
    this.restaurantService.getRestaurant(restaurantID)
    .subscribe(restaurant => this.restaurant = restaurant.data);
  }

  edit() {
    this.dialogService.editRestaurantDialog(this.restaurant).subscribe(uploadData => {
      if (uploadData) {
        this.restaurantService.uploadRestaurant(this.restaurant.id, uploadData)
        .subscribe(restaurant => this.restaurant = restaurant);
      }
    });
  }

  activate() {
    this.restaurantService.publishRestaurant(this.restaurant.id)
    .subscribe((data) => {
      this.snackBarService.show(data.messages[0]);
      this.ngOnInit();
    },
    (err) => {
      this.snackBarService.show('Nie można aktywować restauracji!');
    });
  }

  hide() {
    this.restaurantService.hideRestaurant(this.restaurant.id)
    .subscribe((data) => {
      this.snackBarService.show(data.messages[0]);
      this.ngOnInit();
    },
    (err) => {
      this.snackBarService.show('Wystąpił błąd!');
    });
  }

}
