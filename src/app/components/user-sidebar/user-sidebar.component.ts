import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IFilters} from "../../../interfaces";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './user-sidebar.component.html',
    styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent {
    @Output() getFilters = new EventEmitter<IFilters>();
    filters: IFilters = {
        skill: true,
        mySkill: true,
        myGrade: true,
        myRole: true,
        position: true,
        myPosition: true
    };

    constructor(private userService: UserService, private router: Router, private oidc: OidcSecurityService) {
    }

    goToMyProfile() {
        const user = this.userService.getUser();
        if (user) {
            this.router.navigate(['profile', user.id]);
        } else {
            this.oidc.authorize();
        }
    }

    filterNodes() {
        this.getFilters.emit(this.filters);
    }
}
