import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {
  @Input() users: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
