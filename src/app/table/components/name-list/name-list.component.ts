import {Component, OnInit} from '@angular/core';
import {EmployeesService, IEmployee} from "../../services/employees.service";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-name-list',
    templateUrl: './name-list.component.html',
    styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {
    employees$: BehaviorSubject<IEmployee[]>;

    constructor(private employeesService: EmployeesService) {
    }

    ngOnInit(): void {
        this.employees$ = this.employeesService.employees$;
        this.employeesService.loadEmployees();
    }

}
