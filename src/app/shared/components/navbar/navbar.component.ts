import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from 'src/app/authorization/auth-dialog/auth-dialog.component';
import { RegisterRestaurantComponent } from 'src/app/authorization/register-restaurant/register-restaurant.component';
import { AuthService } from 'src/app/authorization/auth.service';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: Observable<boolean>;
  public itemsInBasket: number;
  private isBasketPreviewVisible = true;

  constructor(public dialog: MatDialog, private auth: AuthService, private order: OrderService) { }

  public ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.order.isBasketPreviewVisible().subscribe(visible => this.isBasketPreviewVisible = visible);
  }

  public openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }

  public openRegisterRestaurantDialog(): void {
    this.dialog.open(RegisterRestaurantComponent);
  }

  public logout(): void {
    this.auth.logout();
  }

  public toggle() {
    this.order.setBasketPreviewVisible(!this.isBasketPreviewVisible);
  }

  public setBasketItemCount(count: number) {
    this.itemsInBasket = count;
  }

}
