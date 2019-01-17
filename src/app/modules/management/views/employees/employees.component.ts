import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantRoles } from 'src/app/core/utils';
import { RestaurantService, SnackBarService, Restaurant } from 'src/app/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export class Grant {
  email: string;
  role: number;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public restaurant: Restaurant;
  public grant = new Grant();
  public roles = [
    { name: 'Współwłaściciel', index: RestaurantRoles.Owner },
    { name: 'Menadżer', index: RestaurantRoles.Manager },
    { name: 'Kucharz', index: RestaurantRoles.Cook }
  ];

  constructor(private restaurantService: RestaurantService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const restaurantID = this.route.parent.snapshot.params['id'];
    this.restaurantService.getRestaurant(restaurantID)
    .subscribe(restaurant => this.restaurant = restaurant.data);
  }

  onAddEmployee() {
    this.restaurantService.grantUserRole(this.grant.email, this.grant.role, this.restaurant.id)
    .subscribe((data) => {
      this.snackBarService.show(data.messages[0]);
      this.ngOnInit();
    },
    (err) => {
      this.snackBarService.show('Nie mona dodać tego użytkownika!');
    });
  }

  onRemoveEmployee(userID: number) {
    this.restaurantService.removeUser(userID, this.restaurant.id)
    .subscribe((data) => {
      this.snackBarService.show(data.messages[0]);
      this.ngOnInit();
    },
    (err) => {
      this.snackBarService.show('Nie można usunąć tego użytkownika!');
    });
  }

  getRoleName(id: number) {
    return this.roles.find(role => role.index === id).name;
  }

}
