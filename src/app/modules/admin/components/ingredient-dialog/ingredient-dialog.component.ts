import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Ingredient } from 'src/app/core/models/Ingredient';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {

  public error = '';
  public imageFile;
  public thumbnailFile;
  public ingredientName = '';
  public thumbnailFileName = '';
  public imageFileName = '';
  public ingredientIndex = 0;
  public loading = false;
  public ingredient: Ingredient;

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    public dialog: MatDialog,
    private adminService: AdminService) { }

  public ngOnInit() {
    if (this.ingredient) {
      this.imageFileName = this.ingredient.image;
      this.thumbnailFileName = this.ingredient.thumbnail;
      this.ingredientName = this.ingredient.name;
      this.ingredientIndex = this.ingredient.index;
    }
  }

  public onConfirm() {
    if (this.ingredientName === '' || this.imageFileName === '' || this.thumbnailFileName === '') {
      return;
    }

    const formData = new FormData();
    this.loading = true;

    if (this.ingredient) {

      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      if (this.thumbnailFile) {
        formData.append('thumbnail', this.thumbnailFile);
      }

      formData.append('name', this.ingredientName);
      formData.append('index', this.ingredientIndex.toString());
      this.adminService.updateIngredients(this.ingredient.id, formData)
      .subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      formData.append('name', this.ingredientName);
      formData.append('image', this.imageFile);
      formData.append('thumbnail', this.thumbnailFile);
      formData.append('index', this.ingredientIndex.toString());
      this.adminService.addIngredients(formData).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  public selectedImage(event) {
    this.imageFile = event.target.files[0];
    this.imageFileName = event.target.files[0].name;
  }

  public selectedThumbnail(event) {
    this.thumbnailFile = event.target.files[0];
    this.thumbnailFileName = event.target.files[0].name;
  }
}
