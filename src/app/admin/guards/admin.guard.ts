import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../../shared/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAdmin = this.userService.getUser().isAdmin;
        if (!isAdmin) {
            this.router.navigate(['']);
        }
        return isAdmin;
    }
}
