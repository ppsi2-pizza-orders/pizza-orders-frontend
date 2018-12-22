import { Restaurant } from 'src/app/core/models/Restaurant';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BaseTableViewComponent } from '../base-table-view/base-table-view.component';
import {AdminService} from '../../admin.service';

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
export class RestaurantsComponent extends BaseTableViewComponent implements OnInit {
  public restaurants: Restaurant[];
  public displayedColumns: string[] = ['id', 'name', 'city', 'created_at', 'action'];
  public dataSource: MatTableDataSource<Restaurant>;
  public expandedElement: any;

  constructor(private adminService: AdminService) {
    super();
  }

  public ngOnInit() {
    this.loadingPage = true;
    this.adminService.getRestaurants()
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

  public showDetails(id: number) {
    if (this.expandedElement) {
      if (id === this.expandedElement) {
        this.expandedElement = null;
        return;
      }
    }
    this.expandedElement = id;
  }

  protected performQuery(params) {
    this.adminService.getRestaurants(params)
    .subscribe(restaurants => {
      this.restaurants = restaurants['data'];
      this.dataSource = new MatTableDataSource<Restaurant>(this.restaurants);
    });
  }

}
