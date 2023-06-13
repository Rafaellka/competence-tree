import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IMonth, months} from "../../interfaces/IMonth";
import {EmployeeService} from "../../services/employee.service";
import {UserService} from "../../../shared/services/user.service";
import {RenderEmployee} from "../../models/render-employee";
import {RenderEmployeeViewModel} from "../../view-models/render-employee.view-model";
import {TableSalary} from "../../models/table-salary";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Salary} from "../../models/salary";

@Component({
    selector: 'app-salary-table',
    templateUrl: './salary-table.component.html',
    styleUrls: ['./salary-table.component.scss']
})
export class SalaryTableComponent implements OnInit {
    public employees$: Observable<RenderEmployee[]>;
    public months: IMonth[];
    public isCellChangeMode: boolean = false;
    public renderEmployeeViewModel: RenderEmployeeViewModel;
    public currentDate: Date;
    public formGroup: FormGroup;
    public years: number[] = [2023, 2024];
    public range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

    constructor(
        private _employeeService: EmployeeService,
        private _userService: UserService,
        private _fb: FormBuilder
    ) {
        this.months = months;
        this.renderEmployeeViewModel = new RenderEmployeeViewModel(this._employeeService);
        this.currentDate = new Date();
        this.formGroup = _fb.group({
            year: new Date().getFullYear().toString()
        });
        this.formGroup.get('year')?.valueChanges.subscribe((year) => {
            const myId = this._userService.getMyId();
            this.renderEmployeeViewModel.resetList();
            this.renderEmployeeViewModel.initializeList(myId, year);
        })
    }

    public ngOnInit(): void {
        const myId = this._userService.getMyId();
        this.renderEmployeeViewModel.initializeList(myId, this.formGroup.get('year')?.value);
    }

    public hideSubordinates(employeeId: string) {
        this.renderEmployeeViewModel.hideSubordinates(employeeId);
    }

    public showSubordinates(id: string) {
        this.renderEmployeeViewModel.loadSubordinates(id, this.formGroup.get('year')?.value);
    }

    // showModal(fieldName: Field, employee: IEmployee, salary: ISalary) {
    //     this.isModalOpen = true;
    //     this.changeFieldState.oldSalary = salary;
    //     this.changeFieldState.date = new Date();
    //     this.changeFieldState.fieldType = fieldName;
    // }

    public saveFieldChanges(salary: TableSalary, employeeId: string) {
        salary.startDate.setFullYear(this.formGroup.get('year')?.value);
        this.renderEmployeeViewModel.updateEmployeeSalary({
            ...salary
        }, employeeId);
    }

    public changeMode(salary: Salary, fieldType: string): void {
        if (!this.isCellChangeMode) {
            // @ts-ignore
            salary[fieldType].isChangeMode = !salary[fieldType].isChangeMode;
            this.isCellChangeMode = !this.isCellChangeMode;
        }

    }

    public handleEscape(salary: Salary, fieldType: string) {
        this.isCellChangeMode = false;
        // @ts-ignore
        salary[fieldType].isChangeMode = false;
    }
}
