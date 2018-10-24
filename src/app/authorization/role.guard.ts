import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';

@Injectable()
export class RoleGuard implements CanLoad {

    constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) { }

    canLoad(route: Route) {
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        // const tokenPayload = decode(token);
        const tokenPayload = {role: 'admin2'};

        if (
            this.auth.isAuthenticated() ||
            tokenPayload.role === expectedRole
        ) {
            return true;
        }

        const dialogRef = this.dialog.open(LoginComponent, {
            data: { isLoggedIn: false }
        });

        return dialogRef.afterClosed().toPromise().then(result => {
            if (result != null) {
                return result.isLoggedIn ? true : false;
            } else {
                this.router.navigate([ '/' ]);
                return false;
            }
        });
    }
}

