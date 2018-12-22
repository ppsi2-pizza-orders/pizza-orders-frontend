import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './restaurant.routing';
import { SharedModule } from '../../shared';
import { MenuComponent } from './views/menu/menu.component';
import { PizzaCreatorComponent } from './views/pizza-creator/pizza-creator.component';
import { OfferComponent } from './views/offer/offer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RestaurantComponent } from './views/restaurant.component';

@NgModule({
  declarations: [
    MenuComponent,
    PizzaCreatorComponent,
    OfferComponent,
    SidebarComponent,
    RestaurantComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class RestaurantModule { }
