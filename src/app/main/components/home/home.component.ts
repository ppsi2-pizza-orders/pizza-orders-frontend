/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { MapsAPILoader } from '@agm/core';
import { Restaurant } from 'src/app/shared/models/Restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private restaurants: Restaurant[];
  private autocomplete;
  private isListVisible = false;
  private loading = true;
  private notFound = false;
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('list') public listRestaurant: ElementRef;

  constructor(
    private restaurantService: RestaurantService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        this.autocomplete = new google.maps.places.Autocomplete(
          this.searchElement.nativeElement,
          {
            types: ['(cities)'],
            componentRestrictions: { country: 'pol' }
          }
        );
      }
    );
  }

  getRestaurants() {
    if (this.autocomplete.getPlace()) {
      this.isListVisible = true;
      this.restaurants = [];
      this.notFound = false;
      this.loading = true;
      this.restaurantService.getRestaurants(this.autocomplete.getPlace().name)
        .subscribe(restaurants => {
          this.restaurants = restaurants;
          this.loading = false;
          if (this.restaurants.length === 0) {
            this.notFound = true;
          }
        });

      setTimeout(() => {
        this.listRestaurant.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

}
