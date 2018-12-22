import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean;
  public itemsInOrder: number;
  public userName: string;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private dialogService: DialogService) { }

  public ngOnInit() {
    this.subscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    this.subscription.add(
      this.orderService.getOrderProducts().subscribe(products => {
        if (products) {
          this.itemsInOrder = products.length;
        }
      })
    );
    this.subscription.add(
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.userName = user.name;
        }
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public openAuthDialog() {
    this.dialogService.authDialog();
  }

  public openRegisterRestaurantDialog() {
    this.dialogService.registerRestaurantDialog();
  }

  public logout() {
    this.authService.logout();
  }

  public openOrderPreview() {
    this.orderService.openOrderPreview();
  }

}
