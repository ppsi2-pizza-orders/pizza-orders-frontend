import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/core/models/Ingredient';
import { MatTableDataSource } from '@angular/material';
import { AdminDialogService } from '../../admin-dialog.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { BaseTableViewComponent } from '../base-table-view/base-table-view.component';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends BaseTableViewComponent implements OnInit {
  public ingredients: Ingredient[];
  public displayedColumns: string[] = ['id', 'image', 'name', 'action'];
  public dataSource: MatTableDataSource<Ingredient>;

  constructor(
    private adminService: AdminService,
    private adminDialogService: AdminDialogService,
    private dialogService: DialogService) {
    super();
  }

  public ngOnInit() {
    this.loadingPage = true;
    this.adminService.getIngredients().subscribe(users => {
      this.ingredients = users['data'];
      this.totalItemCount = users['meta'].paginator.last_page * 25;
      this.dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
      this.loadingPage = false;
    });
    this.sort.sortChange.subscribe(params => {
      this.sortBy(params);
    });
  }

  public deleteIngredient(ingredient: Ingredient) {
    this.dialogService.confirmDialog(`Czy na pewno chcesz usunąć składnik "${ingredient.name}" ?`)
    .subscribe(result => {
      if (!!result) {
        this.adminService.deleteIngredients(ingredient.id)
        .subscribe(() => {
          this.performQuery({});
        });
      }
    });
  }

  public openIngredientDialog(ingredient?: Ingredient) {
    this.adminDialogService.ingredientDialog(ingredient)
    .subscribe(() => this.performQuery());
  }

  protected performQuery(params?) {
    this.adminService.getIngredients(params).subscribe(users => {
      this.ingredients = users['data'];
      this.dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
    });
  }
}
