import { ProjectService } from './../../services/project.service';
import {Component, Input, OnInit} from '@angular/core';
import {IMyProject, IProject} from "../../interfaces";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() 
    info: IMyProject;
    id: number;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  deleteProject() {
    this.projectService.deleteMyProject(this.info.id);
  }
}
