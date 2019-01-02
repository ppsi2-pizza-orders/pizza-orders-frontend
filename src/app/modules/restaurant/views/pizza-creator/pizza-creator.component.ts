import { Component, OnInit } from '@angular/core';
import { MockIngredients } from 'src/app/shared/mock/mock-ingredients';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/core/models/Ingredient';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { OrderService, Pizza, DialogService } from 'src/app/core';
import { PIZZA_TYPES } from 'src/app/core/const';
import { DialogTypes } from 'src/app/shared/components/info-dialog/info-dialog.component';

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
  private modifiedPizza = false;
  private modifiedPizzaID: number;
  private modifiedPizzaName: string;

  private pizzaPrice = 14;
  private ingredientsPrice = 5;
  private currentPage = 0;
  private itemsPerPage = 16;
  private maxDropzoneIngredients = 9;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private dialogService: DialogService) { }

  public ngOnInit() {
    Object.assign(this.avaiableIngredients, MockIngredients);
    this.displayIngredients = this.avaiableIngredients.slice(0, this.itemsPerPage);
    this.restaurantService.currentRestaurant.subscribe(restaurant => this.currentRestaurant = restaurant);
    const pizzaId = Number(this.route.snapshot.paramMap.get('pizza'));
    if (pizzaId) {
      this.initPizza(pizzaId);
    }
  }

  public moveToDropzone(item: Ingredient): void {
    if (this.dropzoneIngredients.length === this.maxDropzoneIngredients) {
      this.dialogService.infoDialog('Osiągnięto maksymalną ilość składników w pizzy!', '', DialogTypes.WARNING);
    } else {
      this.remove(item, this.avaiableIngredients);
      this.remove(item, this.displayIngredients);
      this.remove(item, this.dropzoneIngredients);

      this.dropzoneIngredients.push(item);
      this.refreshPage();
    }
  }

  public moveToAvailable(item: Ingredient): void {
    this.remove(item, this.avaiableIngredients);
    this.remove(item, this.displayIngredients);
    this.remove(item, this.dropzoneIngredients);

    this.avaiableIngredients.push(item);
    this.refreshPage();
  }

  public remove(item: Ingredient, list: Array<Ingredient>) {
    if (list.indexOf(item) !== -1) {
      list.splice(list.indexOf(item), 1);
    }
  }

  public getPrice(): number {
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

  public addToOrder() {
    if (this.dropzoneIngredients.length === 0) {
      this.dialogService.infoDialog('Proszę dodać przynajmniej 1 składnik!', '', DialogTypes.WARNING);
    } else {
      const pizza = new Pizza({
        id: this.modifiedPizzaID,
        name: this.modifiedPizza ? `Zmodyfikowana ${this.modifiedPizzaName}` : 'Pizza własna',
        type: this.modifiedPizza ? PIZZA_TYPES.MENU_CUSTOMIZED : PIZZA_TYPES.CUSTOM,
        ingredients: this.dropzoneIngredients,
        price: this.getPrice().toString()
      });

      this.orderService.addToOrder(pizza, this.currentRestaurant.id);
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
        this.moveToDropzone(ingredient);
      }
    });

    this.modifiedPizza = true;
    this.modifiedPizzaName = pizza.name;
    this.modifiedPizzaID = pizza.id;
  }
}
