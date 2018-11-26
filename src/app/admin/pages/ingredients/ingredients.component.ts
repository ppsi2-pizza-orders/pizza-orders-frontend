import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/Ingredient';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { IngredientService } from 'src/app/shared/services/ingredient.service';
import { IngredientDialogComponent } from '../../components/ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public ingredients: Ingredient[];
  public displayedColumns: string[] = ['id', 'image', 'name', 'action'];
  public dataSource: MatTableDataSource<Ingredient>;
  public loadingPage = false;
  public totalItemCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private ingredientService: IngredientService) { }

  public ngOnInit() {
    this.loadingPage = true;
    this.ingredientService.getAdminIngredients().subscribe(users => {
      this.ingredients = users['data'];
      this.totalItemCount = users['meta'].paginator.last_page * 25;
      this.dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
      this.loadingPage = false;
    });
    this.sort.sortChange.subscribe(params => {
      this.sortBy(params);
    });
  }

  public searchIngredient(value: string) {
    let params = { 'search': value };
    this.performIngredientsQuery(params);
  }

  public swithPage(){
    let pageIndex = this.paginator.pageIndex + 1;
    let params = { 'page': pageIndex }
    this.performIngredientsQuery(params);
  }

  public sortBy(params){
    let query;
    if(params['direction'] === 'asc'){
      query = {'orderBy': params['active']}
    } else{
      query = {'orderByDesc': params['active']}
    }
    this.performIngredientsQuery(query);
  }

  public deleteIngredient(ingredient:Ingredient){
    if(window.confirm(`Czy na pewno chcesz usunąć składnik "${ingredient.name}" ?`)){
      this.ingredientService.deleteAdminIngredients(ingredient.id).subscribe(()=>{
        this.performIngredientsQuery({});
      });
    }
  }

  public openDialog(ingredient?:Ingredient){
    let dialogRef;
    if(ingredient){
      dialogRef = this.dialog.open(IngredientDialogComponent, {data: ingredient});
    }else{
      dialogRef = this.dialog.open(IngredientDialogComponent);
    }

    return dialogRef.afterClosed().toPromise().then(()=> this.performIngredientsQuery({}));
  }

  private performIngredientsQuery(params){
    this.ingredientService.getAdminIngredients(params).subscribe(users => {
      this.ingredients = users['data'];
      this.dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
    });
  }
}
