import { Component, OnInit, OnDestroy } from '@angular/core';
import { tileLayer, latLng, marker, icon } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { from, Subscription } from 'rxjs';
import { Restaurant, RestaurantService } from 'src/app/core';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit, OnDestroy {

  public restaurant: Restaurant;
  public mapReady = false;
  public options: object;
  public layer: object;
  private provider = new OpenStreetMapProvider();
  private subscription: Subscription;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.subscription = this.restaurantService.currentRestaurant
    .subscribe(restaurant => {
      this.restaurant = restaurant;
      this.restaurantCoordinates(restaurant.address, restaurant.city);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  restaurantCoordinates(address: string, city: string) {
    const restaurantAddress = `${address}, ${city}`;

    from(this.provider.search({ query: restaurantAddress }))
    .subscribe(result => {
      if (result[0]) {
        const latX = parseFloat(result[0].x);
        const latY = parseFloat(result[0].y);
        this.initMap(latX, latY);
        this.mapReady = true;
      }
    });
  }

  initMap(latX: number, latY: number) {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 18,
      center: latLng(latY, latX)
    };

    this.layer = marker([ latY, latX ], {
      icon: icon({
         iconSize: [ 80, 80 ],
         iconAnchor: [ 0, 40 ],
         iconUrl: 'assets/dagrasso.jpg'
      })
    });
  }

}
