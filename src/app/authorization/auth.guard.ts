import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public dialog: MatDialog) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
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
