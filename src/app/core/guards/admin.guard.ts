import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services';
import { DialogService } from '../services';

@Injectable()
export class AdminGuard implements CanLoad, CanActivate {

    constructor(private auth: AuthService, private router: Router, private dialogService: DialogService) { }

    canLoad() {
        if (this.auth.isAuthenticated() && this.auth.getUser().isAdmin()) {
            return true;
        }

        this.dialogService.authDialog().subscribe(data => {
            if (data && data.isLoggedIn && data.isAdmin ) {
                this.router.navigate([ 'admin' ]);
                return true;
            } else {
                this.router.navigate([ '*' ]);
                return false;
            }
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isAuthenticated() && this.auth.getUser().isAdmin()) {
            return true;
        }
        this.router.navigate([ '*' ]);
        return false;
    }
}

