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
  public itemsInOrder: number;
  public userName: string

  constructor(private authService: AuthService, private orderService: OrderService, private dialogService: DialogService) { }

  public ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.currentUser().name;
    this.orderService.getOrderProducts().subscribe(products => {
      if(products){
        this.itemsInOrder = products.length;
      }
    })
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

  public openOrderPreview() {
    this.orderService.openOrderPreview();
  }

}
