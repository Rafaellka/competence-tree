import { ProjectService } from './../../services/project.service';
import { UserService } from './../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {IHaveIdAndTitle, IMyProject, IProject} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {SearchUserService} from "../../services/search-user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {IUser} from "../../interfaces/IUser";
import { Observable } from 'rxjs/internal/Observable';


interface IProjectForm {
    project: IProject | any;
    position: string; //
    role: string; //
    grade?: string; //
    id: number;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    projects$: Observable<IProject[]> = new Observable<IProject[]>();
    myProjects$: Observable<IMyProject[]> = new Observable<IMyProject[]>();
    id: string;
    modal: boolean;
    user: IUser;
    isAdmin: boolean;
    roles: IHaveIdAndTitle[] = [];
    projectForm: IProject = {
        name: '',
        role: '',
        position: '',
        id: 0
    };

    constructor(private userService: UserService,
                private activateRoute: ActivatedRoute,
                private searchUser: SearchUserService,
                private oidc: OidcSecurityService,
                private projectService: ProjectService) {
        this.id = activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.projects$ = this.projectService.projects$;
        this.myProjects$ = this.projectService.myProjects$;
        this.projectService.getProjects();
        this.projectService.getMyProjects(this.id);


        this.searchUser.getUserById(this.id).subscribe(user => {
            this.user = {...user};
        })

        this.isAdmin = this.userService.getUser().isAdmin;
        this.projectService.getRoles().subscribe(value => {
            this.roles = value.items;
        }) 
    }

    showModal() {
        this.modal = true;
    }

    saveProject() {
        // this.projects.push(this.projectForm);
        // this.projectForm = {
        //     name: '',
        //     role: '',
        //     position: ''
        // };
        console.log(this.projectForm);

        this.projectService.addProjectToUser(this.projectForm, this.id);
        this.modal = false;        
    }

    logout() {
        this.oidc.logoff().subscribe(console.log);
    }
}
