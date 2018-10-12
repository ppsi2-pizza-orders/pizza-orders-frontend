import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PizzaCreatorComponent } from './pizza-creator/pizza-creator.component';
import { OfferComponent } from './offer/offer.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'creator', component: PizzaCreatorComponent },
      { path: 'offers', component: OfferComponent },
      { path: 'account', component: AccountComponent },
    ]
  }
];
