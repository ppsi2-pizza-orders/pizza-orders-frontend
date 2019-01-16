import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantRoles } from 'src/app/core/utils';
import { RestaurantService, SnackBarService, Restaurant } from 'src/app/core';
import { Subscription } from 'rxjs';

export class Grant {
  email: string;
  role: number;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  public restaurantID: number;
  public grant = new Grant();
  public roles = [
    { name: 'Współwłaściciel', index: RestaurantRoles.Owner },
    { name: 'Menadżer', index: RestaurantRoles.Manager },
    { name: 'Kucharz', index: RestaurantRoles.Cook }
  ];
  private subscribtion: Subscription;

  constructor(private restaurantService: RestaurantService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.subscribtion = this.restaurantService.currentRestaurant
    .subscribe(restaurant => {
      this.restaurantID = restaurant.id;
    });
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  onAddEmployee() {
    this.restaurantService.grantUserRole(this.grant.email, this.grant.role, this.restaurantID)
    .subscribe(() => {
      this.snackBarService.show('Dodano użytkownika!');
    },
    (err) => {
      this.snackBarService.show('Nie mona dodać tego użytkownika!');
    });
  }

  onRemoveEmployee() {
  }

}
