import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {IEmployee} from "../../interfaces/IEmployee";

@Component({
    selector: 'app-name-list',
    templateUrl: './name-list.component.html',
    styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {
    employees$: BehaviorSubject<IEmployee[]>;

    constructor(private employeesService: EmployeeService, private user: UserService) {
    }

    ngOnInit(): void {
        const myId = this.user.getMyId();

        this.employees$ = this.employeesService.subordinates$;
        this.employeesService.loadUserById(myId);
        this.employeesService.loadSubordinates(myId);
    }

    showSubordinates(id: string) {
        this.employeesService.loadSubordinates(id);
    }

}
