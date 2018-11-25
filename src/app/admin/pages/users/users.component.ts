import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  public dataSource: MatTableDataSource<User>;
  public expandedElement: any;
  public loadingPage = false;
  public loadingDetails = false;
  public totalItemCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private restaurantService: UserService) { }

  public ngOnInit() {
    this.loadingPage = true;
    this.restaurantService.getAdminUsers().subscribe(users => {
      this.users = users['data'];
      this.totalItemCount = users['meta'].paginator.last_page * 25;
      this.dataSource = new MatTableDataSource<User>(this.users);
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

  public details(id: number){
    if(this.expandedElement){
      if(id === this.expandedElement){
        this.expandedElement = null; 
        return;
      }
    }
    this.expandedElement = id;
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
    this.restaurantService.getAdminUsers(params).subscribe(users => {
      this.users = users['data'];
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }
}
