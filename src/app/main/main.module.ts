import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { routes } from './main.routing';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './views/menu/menu.component';
import { PizzaCreatorComponent } from './views/pizza-creator/pizza-creator.component';
import { OfferComponent } from './views/offer/offer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RatingComponent } from './components/rating/rating.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './views/home/home.component';
import { RestaurantComponent } from './views/restaurant/restaurant.component';
import { AgmCoreModule } from '@agm/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './views/order/order.component';
import { UserOrdersComponent } from './views/user-orders/user-orders.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { ProgressOrdersComponent } from './components/progress-orders/progress-orders.component';
import { HistoryOrdersComponent } from './components/history-orders/history-orders.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { SummaryOrderComponent } from './components/summary-order/summary-order.component';
import { OrderPickupComponent } from './components/order-pickup/order-pickup.component';
import { OrderPaymentsComponent } from './components/order-payments/order-payments.component';
import { OrderCommentComponent } from './components/order-comment/order-comment.component';

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
    OrderComponent,
    UserOrdersComponent,
    UserSettingsComponent,
    ProgressOrdersComponent,
    HistoryOrdersComponent,
    UserDataComponent,
    SummaryOrderComponent,
    OrderPickupComponent,
    OrderPaymentsComponent,
    OrderCommentComponent
  ],
  providers: [
  ]
})
export class MainModule { }
