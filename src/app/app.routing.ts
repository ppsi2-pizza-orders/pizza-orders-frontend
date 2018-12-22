import { Routes } from '@angular/router';
import {AuthGuard, RoleGuard} from './core/guards';
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
        // canLoad: [RoleGuard],
        // data: {
        //     expectedRole: 'admin'
        // }
    },
    {
        path: 'managment',
        loadChildren: './modules/manage/manage.module#ManageModule',
        canLoad: [RoleGuard],
        data: {
            expectedRole: 'manager'
        }
    },
    { path: '**', redirectTo: '/' }
];
