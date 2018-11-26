import { Routes } from '@angular/router';
import { RoleGuard } from './authorization/role.guard';

export const routes: Routes = [
    { path: '', loadChildren: './main/main.module#MainModule' },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        // canLoad: [RoleGuard],
        // data: {
        //     expectedRole: 'admin'
        // }
    },
    {
        path: 'managment',
        loadChildren: './manage/manage.module#ManageModule',
        canLoad: [RoleGuard],
        data: {
            expectedRole: 'manager'
        }
    },
    { path: '**', redirectTo: '/' }
];
