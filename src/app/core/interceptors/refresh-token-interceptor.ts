import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { JwtInterceptor } from '@auth0/angular-jwt/src/jwt.interceptor';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    private refreshTokenInProgress = false;

    constructor (
        private errorHandlerService: ErrorHandlerService,
        private authService: AuthService,
        private jwtInterceptor: JwtInterceptor) {
    }

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.jwtInterceptor.intercept(req, next).pipe(catchError(error => {
            if (error.status === 401 && !this.refreshTokenInProgress) {
                return this.handle401Error(req, next);
            } else {
                this.errorHandlerService.handleError(error);
                return throwError(error);
            }
        }));
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        this.refreshTokenInProgress = true;
        return this.authService.refreshToken().pipe(
        switchMap(() => {
            this.refreshTokenInProgress = false;
            return this.jwtInterceptor.intercept(req, next).pipe(catchError(error => {
                this.errorHandlerService.handleError(error);
                return throwError(error);
            }));
        }));
    }

}
