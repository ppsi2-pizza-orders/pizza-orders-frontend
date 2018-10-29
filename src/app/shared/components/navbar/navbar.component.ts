import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
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

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }

  openRegisterRestaurantDialog(): void {
    this.dialog.open(RegisterRestaurantComponent);
  }

  logout(): void {
    this.auth.logout();
  }

}
