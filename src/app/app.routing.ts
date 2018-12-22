import { Routes } from '@angular/router';
import { AdminGuard, ManagementGuard } from './core/guards';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    { path: '',
      component: MainLayoutComponent,
      loadChildren: './modules/home/home.module#HomeModule'
    },
    { path: 'restaurant/:id',
      component: MainLayoutComponent,
      loadChildren: './modules/restaurant/restaurant.module#RestaurantModule'
    },
    {
        path: 'admin',
        loadChildren: './modules/admin/admin.module#AdminModule',
        canLoad: [AdminGuard]
    },
    {
        path: 'management',
        loadChildren: './modules/management/management.module#ManagementModule',
        // canLoad: [ManagementGuard]
    },
    { path: '**', redirectTo: '/' }
];
