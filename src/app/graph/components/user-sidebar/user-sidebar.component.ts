import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IFilters} from "../../../shared/interfaces";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {IUser} from "../../../shared/interfaces/IUser";

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './user-sidebar.component.html',
    styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
    @Output() getFilters = new EventEmitter<IFilters>();
    user: IUser;
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

    ngOnInit() {
        this.user = this.userService.getUser();
    }

    goToMyProfile() {
        if (this.user) {
            this.router.navigate(['profile', this.user.id]);
        } else {
            this.oidc.authorize();
        }
    }

    filterNodes() {
        this.getFilters.emit(this.filters);
    }
}
