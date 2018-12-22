import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../services';
import { DialogService } from '../services';

@Injectable()
export class RoleGuard implements CanLoad {

    constructor(private auth: AuthService, private router: Router, private dialogService: DialogService) { }

    canLoad(route: Route) {
        const expectedRole = route.data.expectedRole;

        if (
            this.auth.isAuthenticated() &&
            this.auth.userFromToken().roles.includes(expectedRole)
        ) {
            return true;
        }

        this.dialogService.authDialog().subscribe(data => {
            if (data && data.isLoggedIn && data.userRole.includes(expectedRole) ) {
                return true;
            } else {
                this.router.navigate([ '/' ]);
                return false;
            }
        });
    }
}

