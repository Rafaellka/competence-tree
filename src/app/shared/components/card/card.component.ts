import {Component, Input, OnInit} from '@angular/core';
import {IProject} from "../../interfaces";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() info: IProject;
  constructor() { }

  ngOnInit(): void {
  }

}
