import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isAuthenticated: boolean;

    constructor(protected readonly oidcSecurityService: OidcSecurityService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.oidcSecurityService.isAuthenticated().subscribe((data) => {
            this.isAuthenticated = data;
        });

        if (!this.isAuthenticated) {
            this.oidcSecurityService.authorize();
        }
        return this.isAuthenticated;
    }

}
