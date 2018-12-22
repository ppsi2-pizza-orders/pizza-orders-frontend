import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class RestaurantGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const restaurantID = route.params.id;
        if (this.auth.isRestaurantMember(restaurantID)) {
            return true;
        }
        this.router.navigateByUrl('*');
        return false;
    }
}
