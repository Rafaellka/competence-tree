import {IProject} from './../interfaces';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IHaveIdAndTitle, IMyProject, IResponse} from '../interfaces';
import {environment} from 'src/environments/environment';
import {BehaviorSubject, map, Observable} from 'rxjs';

interface IProjectToUser {
    projectId: number,
    roleId: number,
    employeeId: string
}

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private projects: IProject[] = [];
    private _projects$: BehaviorSubject<IProject[]> = new BehaviorSubject<IProject[]>([]);
    public projects$: Observable<IProject[]>;

    private myProjects: IMyProject[] = [];
    private _myProjects$: BehaviorSubject<IMyProject[]> = new BehaviorSubject<IMyProject[]>([]);
    public myProjects$: Observable<IMyProject[]>;

    constructor(private http: HttpClient) {
        this.projects$ = this._projects$.asObservable();
        this.myProjects$ = this._myProjects$.asObservable();
    }

    addProjectToUser(projects: IProject, id: string) {
        return this.http.post<IProjectToUser>(environment.apiURL + `project-roles`, {
            projectId: +projects.id,
            roleId: +projects.role,
            employeeId: id
        }).pipe(map(el => {
            return {
                id: 0,
                project: {
                    id: el.projectId,
                    name: projects.name
                },
                role: {
                    id: el.roleId,
                    title: ''
                }
            } as IMyProject
        })).subscribe(value => {
            this.myProjects.push(value);
            this._myProjects$.next(this.myProjects);
        })
    }

    getProjects() {
        return this.http.get<IResponse<{ name: string; id: number }>>(environment.apiURL + `projects`)
            .pipe(map(el =>
                el.items.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                        role: '',
                        grade: '',
                        position: ''
                    } as IProject
                })
            )).subscribe((values) => {
                this.projects = values;
                this._projects$.next(this.projects);
            });
    }

    getRoles() {
        return this.http.get<IResponse<IHaveIdAndTitle>>(environment.apiURL + `roles`);
    }

    getMyProjects(id: string) {
        return this.http.get<IMyProject[]>(environment.apiURL + `employees/${id}/project-roles`)
            .subscribe(value => {
                this.myProjects = value;
                this._myProjects$.next(this.myProjects);
            });
    }

    createProject(projectName: string) {
        return this.http.post<number>(environment.apiURL + `projects`, {
            name: projectName
        }).pipe(map(el => {
            return {
                name: projectName,
                id: el,
                role: '',
                grade: '',
                position: ''
            } as IProject
        }))
            .subscribe(value => {
                this.projects.push(value);
                this._projects$.next(this.projects);
            })
    }

    updateProject(project: { id: number, name: string }) {
        return this.http.put(environment.apiURL + `projects/${project.id}`, {
            projectId: project.id,
            name: project.name
        }).subscribe(() => {
            for (let el of this.projects) {
                if (el.id === project.id) {
                    el.name = project.name;
                }
            }
            this._projects$.next(this.projects);
        })
    }

    deleteProject(id: number) {
        return this.http.delete(environment.apiURL + `projects/${id}`, {
            body: {
                projectId: id
            }
        }).subscribe(() => {
            this.projects = this.projects.filter(name => name.id !== id);
            this._projects$.next(this.projects);
        })
    }

    deleteMyProject(id: number) {
        return this.http.delete(environment.apiURL + `project-roles/${id}`, {
            body: {
                projectRoleId: id
            }
        }).subscribe(() => {
            this.myProjects = this.myProjects.filter(name => name.id !== id);
            this._myProjects$.next(this.myProjects);
        })
    }
}


