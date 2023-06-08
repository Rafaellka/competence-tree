import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {IProject} from '../../interfaces';
import {Observable} from 'rxjs';

type ModalType = 'Create' | 'Edit';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    public projects$: Observable<IProject[]> = new Observable<IProject[]>();
    public currentProject: IProject | undefined;
    public projectNameInputValue: string = ''
    public modalType: ModalType;
    public isOpen: boolean = false;
    public projects: IProject[];

    constructor(private projectService: ProjectService) {
    }

    public ngOnInit(): void {
        this.projectService.projects$
            .subscribe((projects) => {
                this.projects = projects;
            });
        this.projectService.getProjects();
    }

    public showModal(type: ModalType, project?: IProject): void {
        this.modalType = type;
        this.isOpen = true;
        if (project) {
            this.currentProject = project;
        }
    }

    public createProject(): void {
        this.projectService.createProject(this.projectNameInputValue);
        this.projectNameInputValue = '';
        this.isOpen = false;
    }

    public updateProject(): void {
        if (this.currentProject) {
            this.projectService.updateProject({
                id: this.currentProject.id,
                name: this.projectNameInputValue
            });
        }
        this.projectNameInputValue = '';
        this.isOpen = false;
    }

    public deleteProject(): void {
        if (this.currentProject) {
            this.projectService.deleteProject(this.currentProject.id);
        }
        this.projectNameInputValue = '';
        this.isOpen = false;
    }
}
