import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Ingredient } from '../shared/models/Ingredient';
import { IngredientDialogComponent } from './components/ingredient-dialog/ingredient-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AdminDialogService {

  constructor(private dialog: MatDialog) { }

  public ingredientDialog(ingredient?: Ingredient){
    let dialogRef: MatDialogRef<IngredientDialogComponent>;
    dialogRef = this.dialog.open(IngredientDialogComponent);

    if(ingredient){
      dialogRef.componentInstance.ingredient = ingredient;
    }

    return dialogRef.beforeClose();
  }

}
