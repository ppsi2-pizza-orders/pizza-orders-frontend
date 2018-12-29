import { Component, OnInit } from '@angular/core';
import { MockIngredients } from 'src/app/shared/mock/mock-ingredients';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ingredient } from 'src/app/core/models/Ingredient';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-pizza-creator',
  templateUrl: './pizza-creator.component.html',
  styleUrls: ['./pizza-creator.component.scss']
})
export class PizzaCreatorComponent implements OnInit {
  public avaiableIngredients: Array<Ingredient> = [];
  public displayIngredients: Array<Ingredient> = [];
  public dropzoneIngredients: Array<Ingredient> = [];
  public currentIngredient: Ingredient;
  public currentRestaurant: Restaurant;
  private pizzaPrice = 14;
  private ingredientsPrice = 3;
  private currentPage = 0;
  private itemsPerPage = 16;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  public ngOnInit() {
    Object.assign(this.avaiableIngredients, MockIngredients);
    this.displayIngredients = this.avaiableIngredients.slice(0, this.itemsPerPage);
    this.restaurantService.currentRestaurant.subscribe(restaurant => this.currentRestaurant = restaurant);
    const pizzaId = Number(this.route.snapshot.paramMap.get('pizza'));
    if (pizzaId) {
      this.initPizza(pizzaId);
    }
  }

  public move(item: Ingredient, list: Array<Ingredient>): void {
    this.remove(item, this.avaiableIngredients);
    this.remove(item, this.displayIngredients);
    this.remove(item, this.dropzoneIngredients);

    list.push(item);
    this.refreshPage();
  }

  public remove(item: Ingredient, list: Array<Ingredient>) {
    if (list.indexOf(item) !== -1) {
      list.splice(list.indexOf(item), 1);
    }
  }

  public getPrice() {
    return this.pizzaPrice + (this.dropzoneIngredients.length * this.ingredientsPrice);
  }

  public nextPage() {
    const canNext = (this.currentPage * this.itemsPerPage) + this.itemsPerPage < this.avaiableIngredients.length;
    if (canNext) {
      this.currentPage++;
      this.refreshPage();
    }
  }

  public prevPage() {
    if (this.currentPage !== 0) {
      this.currentPage--;
      this.refreshPage();
    }
  }

  private refreshPage() {
    const begin = this.currentPage * this.itemsPerPage;
    const end = begin + this.itemsPerPage;
    this.displayIngredients = this.avaiableIngredients.slice(begin, end);
  }

  private initPizza(id: number) {
    const pizza = this.currentRestaurant.pizzas.filter(p => p.id === id)[0];
    const ingredients = pizza.ingredients.map(i => i.id);
    this.avaiableIngredients.forEach(ingredient => {
      if (ingredients.includes(ingredient.id)) {
        this.move(ingredient, this.dropzoneIngredients);
      }
    });
  }
}
