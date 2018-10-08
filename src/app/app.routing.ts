import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: './main/main.module#MainModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
];
