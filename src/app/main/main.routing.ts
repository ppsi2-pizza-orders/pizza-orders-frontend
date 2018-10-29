import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { PizzaCreatorComponent } from './components/pizza-creator/pizza-creator.component';
import { OfferComponent } from './components/offer/offer.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'restaurant/:id', component: RestaurantComponent,
        children: [
          { path: '', redirectTo: 'menu', pathMatch: 'full' },
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
          },
          { path: '**', redirectTo: '/' }
        ]
      }
    ]
  }
];
