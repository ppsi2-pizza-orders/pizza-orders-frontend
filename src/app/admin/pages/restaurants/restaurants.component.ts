import { Restaurant } from 'src/app/shared/models/Restaurant';
import { RestaurantService } from './../../../shared/services/restaurant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  public restaurants: Restaurant[];
  public displayedColumns: string[] = ['id', 'name', 'city'];
  public dataSource: MatTableDataSource<Restaurant>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private restaurantService: RestaurantService) { }

  public ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
      this.dataSource = new MatTableDataSource<Restaurant>(this.restaurants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public search(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  public details(id: number){
    console.log(id);
  }

}
