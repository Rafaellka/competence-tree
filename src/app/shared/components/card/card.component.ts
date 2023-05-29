import { ProjectService } from './../../services/project.service';
import {Component, Input, OnInit} from '@angular/core';
import {IMyProject, IProject} from "../../interfaces";
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  isAdmin: boolean;

  @Input() 
    info: IMyProject;
    id: number;

  constructor(private projectService: ProjectService, private userService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.getUser().isAdmin;
  }

  deleteProject() {
    this.projectService.deleteMyProject(this.info.id);
  }
}
