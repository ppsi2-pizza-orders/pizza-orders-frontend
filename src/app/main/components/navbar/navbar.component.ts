import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authorization/auth.service';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: Observable<boolean>;
  public itemsInBasket: number;
  private isBasketPreviewVisible = true;

  constructor(private authService: AuthService, private orderService: OrderService, private dialogService: DialogService) { }

  public ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.orderService.isBasketPreviewVisible().subscribe(visible => this.isBasketPreviewVisible = visible);
  }

  public openAuthDialog() {
    this.dialogService.authDialog();
  }

  public openRegisterRestaurantDialog(): void {
    this.dialogService.registerRestaurantDialog();
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleBasket() {
    this.orderService.setBasketPreviewVisible(!this.isBasketPreviewVisible);
  }

  public setBasketItemCount(count: number) {
    this.itemsInBasket = count;
  }

}
