import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', loadChildren: './main/main.module#MainModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
];
