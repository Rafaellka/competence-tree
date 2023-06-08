import {concatMap, of} from 'rxjs';
import {ProjectService} from './../../services/project.service';
import {UserService} from './../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {IHaveIdAndTitle, IMyProject, IProject} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {SearchUserService} from "../../services/search-user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {IUser} from "../../interfaces/IUser";
import {Observable} from 'rxjs/internal/Observable';
import {FormControl, FormGroup} from '@angular/forms';

type ModalType = 'Project' | 'Manager';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    projects$: Observable<IProject[]> = new Observable<IProject[]>();
    myProjects$: Observable<IMyProject[]> = new Observable<IMyProject[]>();
    manager$: Observable<IUser> = new Observable<IUser>();
    id: string;
    isOpen: boolean;
    user: IUser;
    allUsers: IUser[] = [];
    manager: IUser | null;
    isAdmin: boolean;
    modalType: ModalType;
    roles: IHaveIdAndTitle[] = [];
    projectForm: IProject = {
        name: '',
        role: '',
        position: '',
        id: 0
    };
    managerForm: IUser;


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
        this.manager$ = this.userService.manager$;
        this.searchUser.getAllUsers().subscribe(value => {
            this.allUsers = value.items;
        })

        this.searchUser.getUserById(this.id).pipe(concatMap((user) => {
            if (!user.managerId) {
                return of({user, manager: null});
            }
            return this.searchUser.getUserById(user.managerId).pipe(concatMap((manager) => {
                return of({user, manager});
            }));
        })).subscribe(obj => {
            console.log(obj.manager)
            this.user = obj.user;
            this.manager = obj.manager;
        })

        this.isAdmin = this.userService.getUser().isAdmin;
        this.projectService.getRoles().subscribe(value => {
            this.roles = value.items;
        })
    }

    form = new FormGroup({
        managers: new FormControl(this.allUsers[0])
    })

    showModal(type: ModalType) {
        if (this.isAdmin) {
            this.isOpen = true;
            this.modalType = type;
        }
    }

    saveProject() {
        this.projectService.addProjectToUser(this.projectForm, this.id);
        this.isOpen = false;
    }

    saveManager() {
        this.userService.appointManager(this.id, this.managerForm.id)
            .subscribe(() => {
                this.manager = this.managerForm;
            }); //this.managerForm.id
        this.isOpen = false;
    }

    logout() {
        this.oidc.logoff().subscribe(console.log);
    }
}
