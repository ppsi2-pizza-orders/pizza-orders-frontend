import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './home.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { HomeComponent} from './views/home/home.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { UserOrdersComponent } from './views/user-orders/user-orders.component';
import { SummaryOrderComponent } from './components/summary-order/summary-order.component';
import { HistoryOrdersComponent } from './components/history-orders/history-orders.component';
import { OrderPaymentsComponent } from './components/order-payments/order-payments.component';
import { OrderPickupComponent } from './components/order-pickup/order-pickup.component';
import { OrderComponent } from './views/order/order.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { OrderCommentComponent } from './components/order-comment/order-comment.component';
import { ProgressOrderComponent } from './components/progress-order/progress-order.component';
import { RestaurantResolverService } from './restaurant-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    OrderComponent,
    UserOrdersComponent,
    UserSettingsComponent,
    ProgressOrderComponent,
    HistoryOrdersComponent,
    UserDataComponent,
    SummaryOrderComponent,
    OrderPickupComponent,
    OrderPaymentsComponent,
    OrderCommentComponent
  ],
  providers: [
    RestaurantResolverService
  ]
})
export class HomeModule { }
