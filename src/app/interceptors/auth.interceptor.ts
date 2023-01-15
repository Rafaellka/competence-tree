import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable, switchMap, throwError, Subject, tap} from 'rxjs';
import {Router} from "@angular/router";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refreshTokenInProgress = false;
    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private injector: Injector, private router: Router, private authService: OidcSecurityService) {
    }

    addAuthHeader(request: any) {
        const authHeader = 'Bearer ' + this.authService.getAccessToken();
        if (authHeader) {
            return request.clone({
                setHeaders: {
                    "Authorization": authHeader
                }
            });
        }
        return request;
    }

    refreshToken(): Observable<any> {
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.refreshTokenInProgress = true;

            return this.authService.getRefreshToken().pipe(
                tap(() => {
                    this.refreshTokenInProgress = false;
                }));
        }
    }


    handleResponseError(error: any, request?: any, next?: any) {

        // Invalid token error
        if (error.status === 401) {
            return this.refreshToken().pipe(
                switchMap(() => {
                    request = this.addAuthHeader(request);
                    return next.handle(request);
                }));
        }

        return throwError(error);
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request);
    }
}
