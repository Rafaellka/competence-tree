import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IProject, IUserData} from "../../../interfaces";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    modal: boolean;
    userData: IUserData;
    projects: IProject[] = [];
    projectForm: IProject = {
        name: '',
        role: '',
        position: '',
        grade: ''
    };

    constructor(private userService: UserService) {
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
        this.userData = this.userService.getUser();
    }
}
