import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PizzaCreatorComponent } from './pages/pizza-creator/pizza-creator.component';
import { OfferComponent } from './pages/offer/offer.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';

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
