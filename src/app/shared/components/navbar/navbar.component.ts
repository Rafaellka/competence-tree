import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/IUser';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public user: IUser;
    public isAdmin: boolean;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _oidcService: OidcSecurityService
    ) {
    }

    public ngOnInit(): void {
        this.user = this._userService.getUser();
        this.isAdmin = this._userService.getUser().isAdmin;
    }

    public goToMyProfile(): void {
        if (this.user) {
            this._router.navigate(['profile', this.user.id]);
        } else {
            this._oidcService.authorize();
        }
    }

    public logout(): void {
        this._oidcService.logoff().subscribe(console.log);
    }


}
