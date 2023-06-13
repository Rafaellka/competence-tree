import {IAddProjectToUserRequest, IProject} from './../interfaces';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IHaveIdAndTitle, IMyProject, IResponse} from '../interfaces';
import {environment} from 'src/environments/environment';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    public myProjects$: Observable<IMyProject[]>;
    public projects$: Observable<IProject[]>;

    private _projects: IProject[] = [];
    private _projects$: BehaviorSubject<IProject[]> = new BehaviorSubject<IProject[]>([]);

    private _myProjects: IMyProject[] = [];
    private _myProjects$: BehaviorSubject<IMyProject[]> = new BehaviorSubject<IMyProject[]>([]);

    constructor(
        private _http: HttpClient
    ) {
        this.projects$ = this._projects$.asObservable();
        this.myProjects$ = this._myProjects$.asObservable();
    }

    public addProjectToUser(body: IAddProjectToUserRequest, roleName: string) {
        const projectName = this._projects.find((project) => project.id === body.projectId);
        this._http.post<number>(environment.apiURL + `project-roles`, body)
            .pipe(
                map(el => ({
                        id: el,
                        project: {
                            id: body.projectId,
                            name: projectName ? projectName.name : ''
                        },
                        role: {
                            id: body.roleId,
                            title: roleName
                        }
                    } as IMyProject)
                )
            )
            .subscribe(value => {
                this._myProjects.push(value);
                this._myProjects$.next(this._myProjects);
            });
    }

    public getProjects() {
        this._http.get<IResponse<{ name: string; id: number }>>(environment.apiURL + `projects`)
            .pipe(
                map(el => el.items.map(item => ({
                            name: item.name,
                            id: item.id,
                            roleName: '',
                            grade: '',
                            position: ''
                        } as IProject
                    ))
                )
            )
            .subscribe((values) => {
                this._projects = values;
                this._projects$.next(this._projects);
            });
    }

    public getRoles() {
        return this._http.get<IResponse<IHaveIdAndTitle>>(environment.apiURL + `roles`);
    }

    public getMyProjects(id: string) {
        this._http.get<IMyProject[]>(environment.apiURL + `employees/${id}/project-roles`)
            .subscribe(value => {
                this._myProjects = value;
                this._myProjects$.next(this._myProjects);
            });
    }

    public createProject(projectName: string) {
        this._http.post<number>(environment.apiURL + `projects`, {
            name: projectName
        })
            .pipe(
                map(el => ({
                        name: projectName,
                        id: el,
                        roleName: '',
                        grade: '',
                        position: ''
                    } as IProject)
                )
            )
            .subscribe(value => {
                this._projects.push(value);
                this._projects$.next(this._projects);
            })
    }

    public updateProject(project: { id: number, name: string }) {
        this._http.put(environment.apiURL + `projects/${project.id}`, {
            projectId: project.id,
            name: project.name
        })
            .subscribe(() => {
                for (let el of this._projects) {
                    if (el.id === project.id) {
                        el.name = project.name;
                    }
                }
                this._projects$.next(this._projects);
            })
    }

    public deleteProject(id: number) {
        this._http.delete(environment.apiURL + `projects/${id}`, {
            body: {
                projectId: id
            }
        })
            .subscribe(() => {
                this._projects = this._projects.filter(name => name.id !== id);
                this._projects$.next(this._projects);
            })
    }

    public deleteMyProject(id: number) {
        this._http.delete(environment.apiURL + `project-roles/${id}`, {
                body: {
                    projectRoleId: id
                }
            }
        )
            .subscribe(() => {
                this._myProjects = this._myProjects.filter(name => name.id !== id);
                this._myProjects$.next(this._myProjects);
            })
    }
}


