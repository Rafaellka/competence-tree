import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { IProject } from '../../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

type ModalType = 'Create' | 'Edit';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]> = new Observable<IProject[]>();

  currentId: number | undefined;
  projectForm: {name: string} = {name: ''};
  modalType: ModalType;
  isOpen: boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.projects$;
    this.projectService.getProjects();
  }

  showModal(type: ModalType, id?: number){
    this.modalType = type;
    this.isOpen = true;
    if (id) {
      this.currentId = id;
    }
  }

  createProject() {
    this.projectService.createProject(this.projectForm);
    // this.projects$
    this.isOpen = false;
  }

  updateProject() {
    if (this.currentId){
      this.projectService.updateProject({id: this.currentId, name: this.projectForm.name});
    }
    this.isOpen = false;
  }

  deleteProject() {
    if (this.currentId){
      this.projectService.deleteProject(this.currentId);
    }
    this.isOpen = false;
  }
}
