import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/Ingredient';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { IngredientService } from 'src/app/shared/services/ingredient.service';
import { AdminDialogService } from '../../admin-dialog.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

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

  constructor(
    private ingredientService: IngredientService, 
    private adminDialogService: AdminDialogService,
    private dialogService: DialogService) { }

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
    let query = { 'search': value };
    this.performIngredientsQuery(query);
  }

  public swithPage(){
    let pageIndex = this.paginator.pageIndex + 1;
    let query = { 'page': pageIndex }
    this.performIngredientsQuery(query);
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
    this.dialogService.confirmDialog(`Czy na pewno chcesz usunąć składnik "${ingredient.name}" ?`).subscribe(result =>{
      if(!!result){
        this.ingredientService.deleteAdminIngredients(ingredient.id).subscribe(()=>{
          this.performIngredientsQuery({});
        });
      }
    });
  }

  public openIngredientDialog(ingredient?:Ingredient){
    this.adminDialogService.ingredientDialog(ingredient).subscribe(()=>this.performIngredientsQuery());
  }

  private performIngredientsQuery(params?){
    this.ingredientService.getAdminIngredients(params).subscribe(users => {
      this.ingredients = users['data'];
      this.dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
    });
  }
}
