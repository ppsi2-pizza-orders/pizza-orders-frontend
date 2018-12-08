import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './views/home/home.component';
import { MenuComponent } from './views/menu/menu.component';
import { PizzaCreatorComponent } from './views/pizza-creator/pizza-creator.component';
import { OfferComponent } from './views/offer/offer.component';
import { RestaurantComponent } from './views/restaurant/restaurant.component';
import { UserOrdersComponent } from './views/user-orders/user-orders.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user-orders', component: UserOrdersComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: 'restaurant/:id', component: RestaurantComponent,
        children: [
          { path: '', redirectTo: 'menu', pathMatch: 'full' },
          { path: 'menu', component: MenuComponent },
          { path: 'offers', component: OfferComponent },
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
    ]
  }
];
