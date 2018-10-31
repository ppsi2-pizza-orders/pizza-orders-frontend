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
  public loading = true;
  public notFound = false;
  public placeholder = 'Np. Wrocław';
  public searchBy = 'city';
  public filteredSugestions: Observable<string[]>;
  public sugestionsCtrl = new FormControl();
  private sugestions;
  private autocomplete = { cities: [], names: [], pizzas: [] };
  @ViewChild('list') public listRestaurant: ElementRef;

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.filteredSugestions = this.sugestionsCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this.filterSugestions(value) : [])
      );
  }

  ngDoCheck(): void {
    if (this.searchBy === 'city') {
      this.placeholder = 'Np. Wrocław';
      this.sugestions = this.autocomplete['cities'];
    }
    if (this.searchBy === 'name') {
      this.placeholder = 'Np. Nocne Gastro';
      this.sugestions = this.autocomplete['names'];
    }
    if (this.searchBy === 'pizza') {
      this.placeholder = 'Np. Hawajska';
      this.sugestions = this.autocomplete['pizzas'];
    }
  }

  ngAfterContentInit(): void {
    this.restaurantService.getAutocomplete().subscribe(data => Object.assign(this.autocomplete, data));
  }

  filterSugestions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sugestions.filter(sugestion => sugestion.toLowerCase().includes(filterValue));
  }

  clearSearch() {
    this.sugestionsCtrl.setValue('');
  }

  getRestaurants() {
    const searchValue = this.sugestionsCtrl.value;
    if (searchValue) {
      this.isListVisible = true;
      this.restaurants = [];
      this.notFound = false;
      this.loading = true;
      this.restaurantService.getRestaurants(this.searchBy, searchValue)
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
