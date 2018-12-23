import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, AuthService, RestaurantService, User, RestaurantRoles } from '../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnDestroy, OnInit {
  public restaurant: Restaurant;
  public user: User;
  public loading = true;
  public mobileQuery: MediaQueryList;
  public role = {
    Owner: RestaurantRoles.Owner,
    Manager: RestaurantRoles.Manager,
    Cook: RestaurantRoles.Cook
  };

  private mobileQueryListener: () => void;
  private subscription: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  public ngOnInit(): void {
    const restaurantId = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.restaurantService.getRestaurant(restaurantId)
    .subscribe(restaurant => {
      this.restaurant = restaurant['data'];
      this.loading = false;
    });
    this.subscription.add(this.authService.getObservableUser()
    .subscribe(user => this.user = user));
  }

  public hasRestaurantRole(roles: RestaurantRoles[]): boolean {
    return roles.includes(this.user.getRestaurantRole(this.restaurant.id));
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.subscription.unsubscribe();
  }

  public logout() {
    this.authService.logout();
  }
}
