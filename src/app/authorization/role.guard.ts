import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@Injectable()
export class RoleGuard implements CanLoad {

    constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) { }

    canLoad(route: Route) {
        const expectedRole = route.data.expectedRole;

        if (
            this.auth.isAuthenticated() &&
            this.auth.currentUser().roles.includes(expectedRole)
        ) {
            return true;
        }

        const dialogRef = this.dialog.open(AuthDialogComponent, {
            data: { isLoggedIn: false }
        });

        return dialogRef.afterClosed().toPromise().then(result => {
            if (result != null && result.isLoggedIn && result.userRole.includes(expectedRole) ) {
                return true;
            } else {
                this.router.navigate([ '/' ]);
                return false;
            }
        });
    }
}

