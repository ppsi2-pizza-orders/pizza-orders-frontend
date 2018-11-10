import { Component, OnInit } from '@angular/core';
import { MockIngredients } from 'src/app/shared/mock/mock-ingredients';
import { Ingredient } from 'src/app/shared/models/Ingredient';

@Component({
  selector: 'app-pizza-creator',
  templateUrl: './pizza-creator.component.html',
  styleUrls: ['./pizza-creator.component.scss']
})
export class PizzaCreatorComponent implements OnInit {
  public avaiableIngredients: Array<Ingredient> = [];
  public displayIngredients: Array<Ingredient> = [];
  public dropzoneIngredients: Array<Ingredient> = [];
  public currentIngredient?: Ingredient;
  private pizzaPrice = 14;
  private ingredientsPrice = 3;
  private currentPage = 0;
  private itemsPerPage = 20;

  constructor() { }

  public ngOnInit() {
    Object.assign(this.avaiableIngredients, MockIngredients);
    this.displayIngredients = this.avaiableIngredients.slice(0, this.itemsPerPage);
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
}
