import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantService, DialogService, SnackBarService, AuthService } from 'src/app/core';
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
    private snackBarService: SnackBarService,
    private authService: AuthService) { }

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
      this.snackBarService.show(err);
    });
  }

  hide() {
    this.restaurantService.hideRestaurant(this.restaurant.id)
    .subscribe((data) => {
      this.snackBarService.show(data.messages[0]);
      this.ngOnInit();
    },
    (err) => {
      this.snackBarService.show(err);
    });
  }

  remove() {
    this.dialogService.confirmDialog('Czy napewno chcesz usunąć restaurację?')
    .subscribe(data => {
      if (data) {
        this.restaurantService.removeRestaurant(this.restaurant.id)
        .subscribe(resp => {
          this.snackBarService.show(resp.messages[0]);
          setTimeout(() => {
            this.authService.logout();
          }, 1500);
        });
      }
    });
  }

}
