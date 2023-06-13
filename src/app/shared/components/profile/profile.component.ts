import {concatMap, of} from 'rxjs';
import {ProjectService} from './../../services/project.service';
import {UserService} from './../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {IAddProjectToUserRequest, IHaveIdAndTitle, IMyProject, IProject} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {SearchUserService} from "../../services/search-user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {IUser} from "../../interfaces/IUser";
import {Observable} from 'rxjs/internal/Observable';
import {FormControl, FormGroup} from '@angular/forms';

type ModalType = 'Project' | 'Manager';

interface ProjectForm {
    projectId: number;
    roleId: number;
    positionName?: string;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public projects$: Observable<IProject[]> = new Observable<IProject[]>();
    public myProjects$: Observable<IMyProject[]> = new Observable<IMyProject[]>();
    public manager$: Observable<IUser> = new Observable<IUser>();
    public profileId: string;
    public isOpen: boolean;
    public user: IUser;
    public allUsers: IUser[] = [];
    public manager: IUser | null;
    public isAdmin: boolean;
    public modalType: ModalType;
    public roles: IHaveIdAndTitle[] = [];
    public projectForm: ProjectForm = {} as ProjectForm;
    public managerForm: IUser;


    constructor(
        private userService: UserService,
        private activateRoute: ActivatedRoute,
        private searchUser: SearchUserService,
        private oidc: OidcSecurityService,
        private projectService: ProjectService
    ) {
        this.profileId = activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.projects$ = this.projectService.projects$;
        this.myProjects$ = this.projectService.myProjects$;
        this.projectService.getProjects();
        this.projectService.getMyProjects(this.profileId);
        this.manager$ = this.userService.manager$;
        this.searchUser.getAllUsers().subscribe(value => {
            this.allUsers = value.items;
        })

        this.searchUser.getUserById(this.profileId).pipe(concatMap((user) => {
            if (!user.managerId) {
                return of({user, manager: null});
            }
            return this.searchUser.getUserById(user.managerId).pipe(concatMap((manager) => {
                return of({user, manager});
            }));
        })).subscribe(obj => {
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
        const roleName: string | undefined = this.roles.find((role) => role.id === +this.projectForm.roleId)?.title;

        const body: IAddProjectToUserRequest = {
            employeeId: this.profileId,
            roleId: +this.projectForm.roleId,
            projectId: +this.projectForm.projectId
        };
        this.projectService.addProjectToUser(body, roleName ? roleName : '');
        this.isOpen = false;
    }

    saveManager() {
        this.userService.appointManager(this.profileId, this.managerForm.id)
            .subscribe(() => {
                this.manager = this.managerForm;
            }); //this.managerForm.id
        this.isOpen = false;
    }

    logout() {
        this.oidc.logoff().subscribe(console.log);
    }
}
