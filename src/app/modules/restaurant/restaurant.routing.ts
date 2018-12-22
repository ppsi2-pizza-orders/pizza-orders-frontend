import {Routes} from '@angular/router';
import {RestaurantComponent} from './views/restaurant.component';
import {PizzaCreatorComponent} from './views/pizza-creator/pizza-creator.component';
import {MenuComponent} from './views/menu/menu.component';
import {OfferComponent} from './views/offer/offer.component';
import {ReviewsComponent} from './views/reviews/reviews.component';


export const routes: Routes = [
  { path: '', component: RestaurantComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'offers', component: OfferComponent },
      { path: 'reviews', component: ReviewsComponent },
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
