import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class RestaurantMemberGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const restaurantID = parseInt(route.params.id, 10);
        if (!!this.auth.getUser() && this.auth.getUser().isRestaurantMember(restaurantID)) {
            return true;
        }
        this.router.navigateByUrl('*');
        return false;
    }
}
