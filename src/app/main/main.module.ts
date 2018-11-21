import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { routes } from './main.routing';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { PizzaCreatorComponent } from './pages/pizza-creator/pizza-creator.component';
import { OfferComponent } from './pages/offer/offer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RatingComponent } from './components/rating/rating.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { AgmCoreModule } from '@agm/core';
import { BasketPreviewComponent } from './components/basket-preview/basket-preview.component';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    SidebarComponent,
    RatingComponent,
    RestaurantComponent,
    NavbarComponent,
    BasketPreviewComponent
  ],
  providers: [
  ]
})
export class MainModule { }
