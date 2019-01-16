import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantService, Pizza, DialogService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(
    private restaurantService: RestaurantService,
    private dialogService: DialogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const restaurantID = this.route.parent.snapshot.params['id'];
    this.restaurantService.getRestaurant(restaurantID)
      .subscribe(restaurant => this.restaurant = restaurant.data);
  }

  add() {
    this.dialogService.addPizza(this.restaurant.ingredients).subscribe(data => {
      if (data) {
        this.restaurantService.addPizzaToMenu(this.restaurant.id, new Pizza(data))
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  edit(pizza: Pizza) {
    this.dialogService.editPizza(this.restaurant.ingredients, pizza).subscribe(data => {
      if (data) {
        this.restaurantService.editMenuPizza(this.restaurant.id, pizza.id, new Pizza(data))
        .subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  remove(pizza: Pizza) {
    this.dialogService.confirmDialog(`Czy na pewno chcesz usunąć pizze ${pizza.name}?`)
    .subscribe(result => {
      if (result) {
        this.restaurantService.removeMenuPizza(this.restaurant.id, pizza.id)
        .subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }


}
