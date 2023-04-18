import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ISalary} from "../../interfaces/ISalary";
import {SalaryService} from "../../services/salary.service";
import {UserService} from "../../../shared/services/user.service";
import {IEmployee} from "../../interfaces/IEmployee";
import {EmployeeService} from "../../services/employee.service";

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
    @Input() month: string;
    employees$: BehaviorSubject<IEmployee[]>;
    salaries$: BehaviorSubject<ISalary[]>;

    constructor(private salaryService: SalaryService,
                private userService: UserService,
                private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        const myId = this.userService.getMyId();
        this.employees$ = this.employeeService.subordinates$;
        this.salaries$ = this.salaryService.salaries$;
        this.salaryService.loadSelfSalary(myId);
        this.salaryService.loadSubordinatesSalaries(myId);
    }

}
