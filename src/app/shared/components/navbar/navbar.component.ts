import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from 'src/app/authorization/auth-dialog/auth-dialog.component';
import { RegisterRestaurantComponent } from 'src/app/authorization/register-restaurant/register-restaurant.component';
import { AuthService } from 'src/app/authorization/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isLoggedIn: Observable<boolean>;

  constructor(public dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuthenticated$();
  }

  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }

  openRegisterRestaurantDialog(): void {
    this.dialog.open(RegisterRestaurantComponent);
  }

  logout(): void {
    this.auth.logout();
  }

}
