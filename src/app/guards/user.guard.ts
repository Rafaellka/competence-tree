import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user = this.userService.getUser();
        const isUser = user ? !user.isAdmin : true;
        if (!isUser) {
            this.router.navigate(['admin']);
        }
        return isUser;
    }

}
