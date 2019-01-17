import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/core/models/Ingredient';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { OrderService, Pizza, DialogService, ApiService } from 'src/app/core';
import { PIZZA_TYPES, ADMIN_API_URLS } from 'src/app/core/const';
import { DialogTypes } from 'src/app/shared/components/info-dialog/info-dialog.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-creator',
  templateUrl: './pizza-creator.component.html',
  styleUrls: ['./pizza-creator.component.scss'],
  animations: [
  trigger('insertRemoveTrigger', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.4s', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('.2s', style({ opacity: 0 }))
    ])
  ]),
  trigger('changePageTrigger', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.4s', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 0 })
    ])
  ]),
]
})
export class PizzaCreatorComponent implements OnInit {
  public avaiableIngredients: Array<Ingredient> = [];
  public displayIngredients: Array<Ingredient> = [];
  public dropzoneIngredients: Array<Ingredient> = [];
  public currentIngredient: Ingredient;
  public currentRestaurant: Restaurant;
  public totalPrice: number;
  public itemsPerPage = 16;
  private modifiedPizza = false;
  private modifiedPizzaID: number;
  private modifiedPizzaName: string;

  private pizzaPrice = 14;
  private ingredientsPrice = 5;
  private currentPage = 0;
  private maxDropzoneIngredients = 9;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private dialogService: DialogService) { }

  public ngOnInit() {
    const pizzaId = Number(this.route.snapshot.paramMap.get('pizza'));
    this.restaurantService.currentRestaurant.subscribe(restaurant => this.currentRestaurant = restaurant);
    this.totalPrice = this.pizzaPrice;

    this.restaurantService.getRestaurantIngredients(this.currentRestaurant.id)
    .subscribe(data => {
      Object.assign(this.avaiableIngredients, data.data);
      this.filterUnavailableIngredients();
      this.displayIngredients = this.avaiableIngredients.slice(0, this.itemsPerPage);
      if (pizzaId) {
        this.initPizza(pizzaId);
      }
    });
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
      this.setPrice();
    }
  }

  public moveToAvailable(item: Ingredient): void {
    this.remove(item, this.avaiableIngredients);
    this.remove(item, this.displayIngredients);
    this.remove(item, this.dropzoneIngredients);

    this.avaiableIngredients.push(item);
    this.refreshPage();
    this.setPrice();
  }

  public remove(item: Ingredient, list: Array<Ingredient>) {
    if (list.indexOf(item) !== -1) {
      list.splice(list.indexOf(item), 1);
    }
  }

  public setPrice(): void {
    const ingredientPrice = this.dropzoneIngredients.reduce((value, ingredient) => {
      return value + ingredient.price;
    }, 0);
    this.totalPrice = this.pizzaPrice + ingredientPrice;
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
    const pizza = new Pizza({
      id: this.modifiedPizzaID,
      name: this.modifiedPizza ? `Zmodyfikowana ${this.modifiedPizzaName}` : 'Pizza własna',
      type: this.modifiedPizza ? PIZZA_TYPES.MENU_CUSTOMIZED : PIZZA_TYPES.CUSTOM,
      ingredients: this.dropzoneIngredients,
      price: this.totalPrice.toString()
    });

    this.orderService.addToOrder(pizza, this.currentRestaurant.id);
  }

  private refreshPage() {
    const begin = this.currentPage * this.itemsPerPage;
    const end = begin + this.itemsPerPage;
    this.displayIngredients = this.avaiableIngredients.slice(begin, end);
  }

  private initPizza(id: number) {
    const pizza = this.currentRestaurant.pizzas.filter(p => p.id === id)[0];
    const ingredients = pizza.ingredients.map(i => i.id);
    const dropzone = [];

    this.avaiableIngredients.forEach(ingredient => {
      if (ingredients.includes(ingredient.id)) {
        dropzone.push(ingredient);
      }
    });

    dropzone.forEach(ingredient => this.moveToDropzone(ingredient));

    this.totalPrice = parseFloat(pizza.price);
    this.modifiedPizza = true;
    this.modifiedPizzaName = pizza.name;
    this.modifiedPizzaID = pizza.id;
  }

  filterUnavailableIngredients() {
    this.avaiableIngredients = this.avaiableIngredients.filter(ingredient => ingredient.available === true);
  }
}
