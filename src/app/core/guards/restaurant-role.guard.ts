import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class RestaurantRoleGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const restaurantID = parseInt(route.parent.params.id, 10);
        const expectedRoles = route.data.expectedRoles;
        const hasExpectedRole = expectedRoles
        .some(role => this.auth.getUser().getRestaurantRole(restaurantID) === role);

        if (!!this.auth.getUser() && hasExpectedRole) {
            return true;
        }

        this.router.navigateByUrl('*');
        return false;
    }
}
