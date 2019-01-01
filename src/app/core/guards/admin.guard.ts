import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services';
import { DialogService } from '../services';

@Injectable()
export class AdminGuard implements CanLoad, CanActivate {

    constructor(private auth: AuthService, private router: Router, private dialogService: DialogService) { }

    canLoad() {
        if (!!this.auth.getUser() && this.auth.getUser().isAdmin()) {
            return true;
        }
        this.router.navigate([ '*' ]);
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!!this.auth.getUser() && this.auth.getUser().isAdmin()) {
            return true;
        }
        this.router.navigate([ '*' ]);
        return false;
    }
}

