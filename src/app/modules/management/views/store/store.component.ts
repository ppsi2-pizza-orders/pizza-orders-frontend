import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantService, DialogService, Ingredient, SnackBarService, ApiService, ADMIN_API_URLS } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public restaurant: Restaurant;
  public ingredients: Ingredient[];
  public selectedIngredient: number;

  constructor(
    private restaurantService: RestaurantService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    const restaurantID = this.route.parent.snapshot.params['id'];
    this.restaurantService.getRestaurant(restaurantID)
      .subscribe(restaurant => this.restaurant = restaurant.data);
    this.getIngredients().subscribe(data => this.ingredients = data.data);
  }

  onSubmit(ingredient: Ingredient) {
    ingredient['ingredient_id'] = ingredient.id;
    this.restaurantService.addIngredient(this.restaurant.id, ingredient)
    .subscribe(() => {
      this.snackBarService.show('Zapisano!');
    },
    (err) => {
      this.snackBarService.show('Nie udało się zapisać składnika!');
    });
  }

  add() {
    const ingredient = new Ingredient({available: true, price: 4});
    ingredient['ingredient_id'] = this.selectedIngredient;

    this.restaurantService.addIngredient(this.restaurant.id, ingredient)
    .subscribe(() => {
      this.snackBarService.show('Dodano składnik!');
      this.ngOnInit();
    },
    (err) => {
      this.snackBarService.show('Nie udało się dodać składnika!');
    });
  }

  private getIngredients(): Observable<any> {
    return this.apiService.get(ADMIN_API_URLS.GetIngredients);
  }

}
