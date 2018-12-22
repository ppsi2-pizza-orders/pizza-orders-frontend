import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/core/models/User';
import { BaseTableViewComponent } from '../base-table-view/base-table-view.component';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseTableViewComponent implements OnInit {
  public users: User[];
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  public dataSource: MatTableDataSource<User>;

  constructor(private adminService: AdminService) {
    super();
  }

  public ngOnInit() {
    this.loadingPage = true;
    this.adminService.getUsers()
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
    this.adminService.getUsers(params)
    .subscribe(users => {
      this.users = users['data'];
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }
}
