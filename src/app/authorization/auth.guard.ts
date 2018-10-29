import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) { }

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.auth.isAuthenticated()) {
            return true;
        }

        const dialogRef = this.dialog.open(AuthDialogComponent, {
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
