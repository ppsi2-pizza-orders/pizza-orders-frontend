import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core';

@Injectable()
export class RestaurantGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const restaurant_id = route.params.id;
        console.log(restaurant_id);
        this.router.navigateByUrl('/');
        return false;
    }
}
