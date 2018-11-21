import { Component, OnInit, ElementRef, ViewChild, DoCheck, AfterContentInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Restaurant } from 'src/app/shared/models/Restaurant';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck, AfterContentInit {

  public restaurants: Restaurant[];
  public isListVisible = false;
  public loading = false;
  public notFound = false;
  public searchBy = 'city';
  public citySugestions: Observable<string[]>;
  public nameSugestions: Observable<string[]>;
  public cityCtrl = new FormControl();
  public nameCtrl = new FormControl();
  private sugestions;
  private autocomplete = { cities: [], names: [] };
  @ViewChild('list') public listRestaurant: ElementRef;

  constructor(
    private restaurantService: RestaurantService
  ) { }

  public ngOnInit() {
    this.citySugestions = this.cityCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => value.length >= 1 ? this.filterSugestions(value) : [])
    );
    this.nameSugestions = this.nameCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => value.length >= 1 ? this.filterSugestions(value) : [])
    );
  }

  public ngDoCheck(): void {
    if (this.searchBy === 'city') {
      this.sugestions = this.autocomplete['cities'];
    }
    if (this.searchBy === 'name') {
      this.sugestions = this.autocomplete['names'];
    }
  }

  public ngAfterContentInit(): void {
    this.restaurantService.getAutocomplete().subscribe(data => Object.assign(this.autocomplete, data));
  }

  public getRestaurants() {
    const cityValue = this.cityCtrl.value;
    const nameValue = this.nameCtrl.value;
    if (cityValue || nameValue)  {
      this.isListVisible = true;
      this.restaurants = [];
      this.notFound = false;
      this.loading = true;
      this.restaurantService.getRestaurants(cityValue, nameValue)
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

  private filterSugestions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sugestions.filter(sugestion => sugestion.toLowerCase().includes(filterValue));
  }

}
