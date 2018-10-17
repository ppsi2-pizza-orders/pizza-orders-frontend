import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main.component';
import { MaterialModule } from '../material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './main.routing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PizzaCreatorComponent } from './pizza-creator/pizza-creator.component';
import { OfferComponent } from './offer/offer.component';
import { DropzoneDirective } from '../shared/directives/dropzone.directive';
import { DroppableDirective } from '../shared/directives/droppable.directive';
import { DraggableDirective } from '../shared/directives/draggable.directive';
import { OrdersComponent } from './orders/orders.component';
import { DroppableService } from '../shared/services/droppable.service';
import { MovableDirective } from '../shared/directives/movable.directive';
import { PizzaService } from '../shared/services/pizza.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RatingComponent } from '../shared/components/rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NavbarComponent,
    MainComponent,
    HomeComponent,
    MenuComponent,
    PizzaCreatorComponent,
    OfferComponent,
    OrdersComponent,
    DropzoneDirective,
    DroppableDirective,
    DraggableDirective,
    MovableDirective,
    SidebarComponent,
    RatingComponent
  ],
  providers: [
    DroppableService,
    PizzaService
  ]
})
export class MainModule { }
