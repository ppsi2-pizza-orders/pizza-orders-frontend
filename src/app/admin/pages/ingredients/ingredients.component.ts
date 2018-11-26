import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/Ingredient';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { IngredientService } from 'src/app/shared/services/ingredient.service';

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

  constructor(private ingredientService: IngredientService) { }

  public ngOnInit() {
    this.loadingPage = true;
    this.ingredientService.getAdminUsers().subscribe(users => {
      this.ingredients = users['data'];
      this.totalItemCount = users['meta'].paginator.last_page * 25;
      this.dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
      this.loadingPage = false;
    });
    this.sort.sortChange.subscribe(params => {
      this.sortBy(params);
    });
  }

  public search(value: string) {
    let params = { 'search': value };
    this.performUserQuery(params);
  }

  public swithPage(){
    let pageIndex = this.paginator.pageIndex + 1;
    let params = { 'page': pageIndex }
    this.performUserQuery(params);
  }

  public sortBy(params){
    let query;
    if(params['direction'] === 'asc'){
      query = {'orderBy': params['active']}
    } else{
      query = {'orderByDesc': params['active']}
    }
    this.performUserQuery(query);
  }

  private performUserQuery(params){
    this.ingredientService.getAdminUsers(params).subscribe(users => {
      this.ingredients = users['data'];
      this.dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
    });
  }
}
