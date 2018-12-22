import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services';
import { DialogService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router, private dialogService: DialogService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isAuthenticated()) {
            return true;
        }

        this.dialogService.authDialog().subscribe(data => {
            if (data && data.isLoggedIn === true) {
                this.router.navigateByUrl(state.url);
                return true;
            } else {
              if (!this.router.url.includes('restaurant')) {
                this.router.navigate([ '/' ]);
              }
              return false;
            }
        });
    }
}
