import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  @Input() month: string;
  @Input() users: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
