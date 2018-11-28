import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Ingredient } from 'src/app/shared/models/Ingredient';
import { IngredientService } from 'src/app/shared/services/ingredient.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {

  public error = '';
  public file;
  public ingredientName = '';
  public fileName = '';
  public loading = false;
  public ingredient: Ingredient;

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    public dialog: MatDialog,
    private ingredientService: IngredientService) { }

  public ngOnInit() {
    if(this.ingredient){
      this.fileName = this.ingredient.image;
      this.ingredientName = this.ingredient.name;
    }
  }

  public onConfirm() {
    if(this.fileName === '' || this.ingredientName === '') {
      return;
    }

    let formData = new FormData();
    this.loading = true;

    if(this.ingredient) {
      if(this.file){
        formData.append('image', this.file);
      }
      formData.append('name', this.ingredientName);
      this.ingredientService.updateAdminIngredients(formData).subscribe(()=>{
        this.dialogRef.close();
      });
    } else {
      formData.append('name', this.ingredientName);
      formData.append('image', this.file);
      this.ingredientService.addAdminIngredients(formData).subscribe(()=>{
        this.dialogRef.close();
      });
    }
  }

  public selectedImage(event){
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }
}
