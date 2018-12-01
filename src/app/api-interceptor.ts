import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './shared/services/error-handler.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    errorHandlerService: ErrorHandlerService;

    constructor(private injector: Injector) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.errorHandlerService = this.injector.get(ErrorHandlerService);
        return next.handle(req).pipe(catchError(error => {
            this.errorHandlerService.handleError(error);
            return throwError(error);
        }));
    }
}