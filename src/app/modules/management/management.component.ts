import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, AuthService, RestaurantService, User, RESTAURANT_ROLES } from '../../core';
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
    owner: RESTAURANT_ROLES.OWNER,
    manager: RESTAURANT_ROLES.MANAGER,
    cook: RESTAURANT_ROLES.COOK
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
    this.subscription = this.restaurantService.getRestaurant(restaurantId).subscribe(restaurant => {
      this.restaurant = restaurant['data'];
      this.loading = false;
    });
    this.subscription.add(this.authService.getCurrentUser().subscribe(user => this.user = user));
  }

  public hasRestaurantRole(...roles: RESTAURANT_ROLES[]): boolean {
    return true;
    return roles.includes(this.user.getRestaurantRole());
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.subscription.unsubscribe();
  }

  public logout() {
    this.authService.logout();
  }
}
