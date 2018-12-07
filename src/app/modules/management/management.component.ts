import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, AuthService, RestaurantService } from 'src/app/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnDestroy, OnInit {
  public restaurant: Restaurant;
  public loading = true;
  public mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

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
    this.restaurantService.getRestaurant(restaurantId).subscribe(restaurant => {
      this.restaurant = restaurant['data'];
      this.loading = false;
    });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public logout() {
    this.authService.logout();
  }
}
