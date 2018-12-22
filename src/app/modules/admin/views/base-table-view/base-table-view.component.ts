import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-base-table-view',
  template: ''
})
export class BaseTableViewComponent implements OnInit {

  public loadingPage = false;
  public totalItemCount: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
  }

  public search(value: string) {
    const query = { 'search': value };
    this.performQuery(query);
  }

  public swithPage() {
    const pageIndex = this.paginator.pageIndex + 1;
    const query = { 'page': pageIndex };
    this.performQuery(query);
  }

  public sortBy(params) {
    let query;
    if (params['direction'] === 'asc') {
      query = {'orderBy': params['active']};
    } else {
      query = {'orderByDesc': params['active']};
    }
    this.performQuery(query);
  }

  protected performQuery(params) {}

}
