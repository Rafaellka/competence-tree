import {Component, OnInit} from '@angular/core';
import {IProject, IUser} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchUserService} from "../../services/search-user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    id: string;
    modal: boolean;
    user: IUser;
    projects: IProject[] = [];
    projectForm: IProject = {
        name: '',
        role: '',
        position: '',
        grade: ''
    };

    constructor(private activateRoute: ActivatedRoute,
                private searchUser: SearchUserService,
                private oidc: OidcSecurityService,
                private router: Router) {
        this.id = activateRoute.snapshot.params['id'];
    }

    showModal() {
        this.modal = true;
    }

    saveProject() {
        this.projects.push(this.projectForm);
        this.projectForm = {
            name: '',
            role: '',
            position: '',
            grade: ''
        };
        this.modal = false;
    }

    ngOnInit(): void {
        this.searchUser.getUserById(this.id).subscribe(user => {
            this.user = {...user};
        })
    }

    logout() {

    }
}
