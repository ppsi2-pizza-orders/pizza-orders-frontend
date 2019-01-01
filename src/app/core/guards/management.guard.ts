import { Injectable } from '@angular/core';
import { CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services';
import { DialogService } from '../services';

@Injectable()
export class ManagementGuard implements CanLoad, CanActivate {

    constructor(private auth: AuthService, private router: Router, private dialogService: DialogService) { }

    canLoad() {
        if (!!this.auth.getUser() && this.auth.getUser().isAnyRestaurantMember()) {
            return true;
        }

        this.router.navigateByUrl('*');
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!!this.auth.getUser() && this.auth.getUser().isAnyRestaurantMember()) {
            return true;
        }

        this.router.navigateByUrl('*');
        return false;
    }

}

