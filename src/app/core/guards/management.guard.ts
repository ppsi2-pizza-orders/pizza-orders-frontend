import { Injectable } from '@angular/core';
import { CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services';
import { DialogService } from '../services';

@Injectable()
export class ManagementGuard implements CanLoad, CanActivate {

    constructor(private auth: AuthService, private router: Router, private dialogService: DialogService) { }

    canLoad() {
        if (this.auth.isAuthenticated() && this.auth.isRestaurantMember()) {
            return true;
        }

        this.dialogService.authDialog().subscribe(data => {
            if (data && data.isLoggedIn && data.isRestaurantMember ) {
                this.router.navigate([ 'management' ]);
                return true;
            } else {
                this.router.navigateByUrl('*');
                return false;
            }
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const restaurantID = parseInt(route.parent.params.id, 10);
        const roles = route.data.expectedRole;
        if (this.auth.isAuthenticated() || roles.some(role => this.auth.hasRestaurantRole(restaurantID, role))) {
            return true;
        }

        this.router.navigateByUrl('*');
        return false;
    }

}
