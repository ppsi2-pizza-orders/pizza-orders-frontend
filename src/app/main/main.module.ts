import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './main.routing';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PizzaCreatorComponent } from './components/pizza-creator/pizza-creator.component';
import { OfferComponent } from './components/offer/offer.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RatingComponent } from './components/rating/rating.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCv-g2bqMONSprY-UjWfGYVaAS77O1EOwc',
      libraries: ['places']
    }),
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    MenuComponent,
    PizzaCreatorComponent,
    OfferComponent,
    OrdersComponent,
    SidebarComponent,
    RatingComponent,
    RestaurantComponent
  ],
  providers: [
  ]
})
export class MainModule { }
