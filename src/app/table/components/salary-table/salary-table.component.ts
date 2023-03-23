import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-salary-table',
  templateUrl: './salary-table.component.html',
  styleUrls: ['./salary-table.component.scss']
})
export class SalaryTableComponent implements OnInit {
  users: string[] = ['123', '123'];

  constructor() { }

  ngOnInit(): void {
  }

}
