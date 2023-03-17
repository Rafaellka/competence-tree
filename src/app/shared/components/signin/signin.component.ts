import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    constructor(
        protected readonly oidcSecurityService: OidcSecurityService,
        protected readonly router: Router) {
    }

    ngOnInit(): void {
        this.oidcSecurityService.checkAuthIncludingServer().subscribe(() => {
            window.location.href = window.location.origin;
        });
    }
}
