import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { DialogService } from '../shared/services/dialog.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router, private dialogService: DialogService) { }

    canActivate() {
        if (this.auth.isAuthenticated()) {
            return true;
        }

        this.dialogService.authDialog().subscribe(data => {
            if (data) {
                return data.isLoggedIn ? true : false;
            } else {
                this.router.navigate([ '/' ]);
                return false;
            }
        });
    }
}
