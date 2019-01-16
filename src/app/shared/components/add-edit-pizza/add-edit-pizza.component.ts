import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Pizza, Ingredient } from 'src/app/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-pizza',
  templateUrl: './add-edit-pizza.component.html',
  styleUrls: ['./add-edit-pizza.component.scss']
})
export class AddEditPizzaComponent implements OnInit {
  public pizza: Pizza;
  public ingredients: Ingredient[];
  public addedIngredients: Ingredient[] = [];
  public filteredIngredients: Observable<Ingredient[]>;
  public pizzaForm: FormGroup;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public ingredientCtrl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddEditPizzaComponent>,
    private formBuilder: FormBuilder
  ) {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: Ingredient | null) => ingredient ? this._filter(ingredient) : this.ingredients.slice()));
  }

  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit() {
    if (this.pizza) {
      this.pizzaForm = this.formBuilder.group({
        name: [this.pizza.name, [Validators.required]],
        price: [this.pizza.price, Validators.required],
        ingredients: []
      });
      this.pizza.ingredients.forEach(ingredient => this.addedIngredients.push(ingredient));
    } else {
      this.pizzaForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        price: ['', Validators.required],
        ingredients: []
      });
    }
  }

  onConfirm() {
    if (this.pizzaForm.invalid) {
      return;
    }
    this.pizzaForm.patchValue({ingredients: this.getIngredientIndexes()});

    this.dialogRef.close(this.pizzaForm.value);
  }

  remove(ingredient: Ingredient): void {
    const index = this.addedIngredients.indexOf(ingredient);

    if (index >= 0) {
      this.addedIngredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const ingredient = event.option.value;
    this.addedIngredients.push(ingredient);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filter(value: Ingredient): Ingredient[] {
    const filterValue = value.name;

    return this.ingredients.filter(ingredient => ingredient.name.indexOf(filterValue) === 0);
  }

  private getIngredientIndexes(): Array<number> {
    const indexes = [];
    this.addedIngredients.forEach(ingredient => indexes.push(ingredient.id));

    return indexes;
  }

}
