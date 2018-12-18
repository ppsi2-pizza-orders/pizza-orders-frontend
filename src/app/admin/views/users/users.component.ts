import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { BaseTableViewComponent } from '../base-table-view/base-table-view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseTableViewComponent implements OnInit {
  public users: User[];
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  public dataSource: MatTableDataSource<User>;

  constructor(private restaurantService: UserService) {
    super();
  }

  public ngOnInit() {
    this.loadingPage = true;
    this.restaurantService.getAdminUsers()
    .subscribe(users => {
      this.users = users['data'];
      this.totalItemCount = users['meta'].paginator.last_page * 25;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.loadingPage = false;
    });
    this.sort.sortChange.subscribe(params => {
      this.sortBy(params);
    });
  }

  protected performQuery(params) {
    this.restaurantService.getAdminUsers(params)
    .subscribe(users => {
      this.users = users['data'];
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }
}
