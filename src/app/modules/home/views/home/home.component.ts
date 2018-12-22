import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import {Restaurant} from '../../../../core/models';
import {RestaurantService} from '../../../../core/services';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {

  public restaurants: Restaurant[];
  public isListVisible = false;
  public loadingSpinner = false;
  public notFound = false;
  public citySugestions: Observable<string[]>;
  public nameSugestions: Observable<string[]>;
  public cityCtrl = new FormControl();
  public nameCtrl = new FormControl();
  private sugestions: Array<string>;
  private autocomplete = { cities: [], names: [] };

  @ViewChild('list') public listRestaurant: ElementRef;
  @ViewChild('nameSearch') public nameSearch: ElementRef;
  @ViewChild('citySearch') public citySearch: ElementRef;
  @ViewChild('invisibleInput') public invisibleInput: ElementRef;


  constructor(private restaurantService: RestaurantService) { }

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

  public ngAfterContentInit(): void {
    this.restaurantService.getAutocomplete().subscribe(autocomplete => {
      Object.assign(this.autocomplete, autocomplete['data']);
    });
  }

  public getRestaurants() {
    const cityValue = this.cityCtrl.value;
    const nameValue = this.nameCtrl.value;
    if (cityValue || nameValue)  {
      this.isListVisible = true;
      this.restaurants = [];
      this.notFound = false;
      this.loadingSpinner = true;
      this.restaurantService.getRestaurants(cityValue, nameValue)
        .subscribe(restaurants => {
          this.restaurants = restaurants['data'];
          this.loadingSpinner = false;
          if (this.restaurants.length === 0) {
            this.notFound = true;
          }
        });

      setTimeout(() => {
        this.listRestaurant.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  public onCityInputFocus() {
    this.sugestions = this.autocomplete['cities'];
    if (window.innerWidth > 768) {
      this.citySearch.nativeElement.classList.add('on-city-focus');
      this.nameSearch.nativeElement.classList.add('on-name-hide');
    }
  }

  public onNameInputFocus() {
    this.sugestions = this.autocomplete['names'];
    if (window.innerWidth > 768) {
      this.citySearch.nativeElement.classList.add('on-city-hide');
      this.nameSearch.nativeElement.classList.add('on-name-focus');
    }
  }

  public onCityInputFocusOut() {
    if (window.innerWidth > 768) {
      this.citySearch.nativeElement.classList.remove('on-city-focus');
      this.nameSearch.nativeElement.classList.remove('on-name-hide');
    }
  }

  public onNameInputFocusOut() {
    if (window.innerWidth > 768) {
      this.citySearch.nativeElement.classList.remove('on-city-hide');
      this.nameSearch.nativeElement.classList.remove('on-name-focus');
    }
  }

  public focusOutElements() {
    this.nameSearch.nativeElement.blur();
    this.citySearch.nativeElement.blur();
  }

  private filterSugestions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sugestions.filter(sugestion => sugestion.toLowerCase().includes(filterValue));
  }
}
