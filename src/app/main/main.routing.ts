import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PizzaCreatorComponent } from './pizza-creator/pizza-creator.component';
import { OfferComponent } from './offer/offer.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'offers', component: OfferComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'creator', component: PizzaCreatorComponent,
        children: [
          {
            path: ':id',
            component: PizzaCreatorComponent
          }
        ]
      }
    ]
  }
];
