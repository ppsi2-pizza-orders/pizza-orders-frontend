import { Restaurant } from 'src/app/shared/models/Restaurant';
import { RestaurantService } from './../../../shared/services/restaurant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden', display: 'none' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RestaurantsComponent implements OnInit {
  public restaurants: Restaurant[];
  public displayedColumns: string[] = ['id', 'name', 'city', 'created_at', 'action'];
  public dataSource: MatTableDataSource<Restaurant>;
  public expandedElement: any;
  public loadingPage = false;
  public totalItemCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private restaurantService: RestaurantService) { }

  public ngOnInit() {
    this.loadingPage = true;
    this.restaurantService.getAdminRestaurants()
    .subscribe(restaurants => {
      this.restaurants = restaurants['data'];
      this.totalItemCount = restaurants['meta'].paginator.last_page * 25;
      this.dataSource = new MatTableDataSource<Restaurant>(this.restaurants);
      this.loadingPage = false;
    });
    this.sort.sortChange.subscribe(params => {
      this.sortBy(params);
    });
  }

  public search(value: string) {
    const query = { 'search': value };
    this.performRestaurantQuery(query);
  }

  public showDetails(id: number) {
    if (this.expandedElement) {
      if (id === this.expandedElement) {
        this.expandedElement = null;
        return;
      }
    }
    this.expandedElement = id;
  }

  public swithPage() {
    const pageIndex = this.paginator.pageIndex + 1;
    const query = { 'page': pageIndex };
    this.performRestaurantQuery(query);
  }

  public sortBy(params) {
    let query;
    if (params['direction'] === 'asc') {
      query = {'orderBy': params['active']};
    } else {
      query = {'orderByDesc': params['active']};
    }
    this.performRestaurantQuery(query);
  }

  private performRestaurantQuery(params) {
    this.restaurantService.getAdminRestaurants(params)
    .subscribe(restaurants => {
      this.restaurants = restaurants['data'];
      this.dataSource = new MatTableDataSource<Restaurant>(this.restaurants);
    });
  }

}
