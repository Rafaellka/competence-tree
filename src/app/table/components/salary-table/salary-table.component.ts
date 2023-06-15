import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IMonth, months} from "../../interfaces/IMonth";
import {EmployeeService} from "../../services/employee.service";
import {UserService} from "../../../shared/services/user.service";
import {RenderEmployee} from "../../models/render-employee";
import {RenderEmployeeViewModel} from "../../view-models/render-employee.view-model";
import {TableSalary} from "../../models/table-salary";
import {FormControl, FormGroup} from "@angular/forms";
import {Salary} from "../../models/salary";

@Component({
    selector: 'app-salary-table',
    templateUrl: './salary-table.component.html',
    styleUrls: ['./salary-table.component.scss']
})
export class SalaryTableComponent implements OnInit {
    public employees$: Observable<RenderEmployee[]>;
    public monthsWithYear: IMonthWithYear[];
    public isCellChangeMode: boolean = false;
    public renderEmployeeViewModel: RenderEmployeeViewModel;
    public currentDate: Date;
    public range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });
    private _defaultStartDate: Date = new Date();
    private _defaultEndDate: Date = new Date(Date.now() + 2678400000);

    constructor(
        private _employeeService: EmployeeService,
        private _userService: UserService,
    ) {
        this.monthsWithYear = [{
            month: {
                name: months[this._defaultStartDate.getMonth()].name,
                date: this._defaultStartDate,
            },
            year: this._defaultStartDate.getFullYear()
        }, {
            month: {
                name: months[this._defaultEndDate.getMonth()].name,
                date: this._defaultEndDate,
            },
            year: this._defaultEndDate.getFullYear()
        }];
        this.renderEmployeeViewModel = new RenderEmployeeViewModel(this._employeeService);
        this.range.valueChanges
            .subscribe(value => {
                if (value.start && value.end) {
                    this.monthsWithYear = this._defineMonths(value.start, value.end);
                    const myId = this._userService.getMyId();
                    this.renderEmployeeViewModel.resetList();
                    this.renderEmployeeViewModel.initializeList(myId, value.start, value.end);
                }
            });
    }

    public ngOnInit(): void {
        const myId = this._userService.getMyId();
        this.renderEmployeeViewModel.initializeList(myId, this._defaultStartDate, this._defaultEndDate);
    }

    public hideSubordinates(employeeId: string) {
        this.renderEmployeeViewModel.hideSubordinates(employeeId);
    }

    public showSubordinates(id: string) {
        const start: Date | null | undefined = this.range.get('start')?.value;
        const end: Date | null | undefined = this.range.get('end')?.value;
        if (start && end) {
            this.renderEmployeeViewModel.loadSubordinates(id, start, end);
        } else {
            this.renderEmployeeViewModel.loadSubordinates(id, this._defaultStartDate, this._defaultEndDate);
        }
    }

    public saveFieldChanges(salary: TableSalary, employeeId: string) {
        const rangeControlStartValue: null | Date | undefined = this.range.get('start')?.value;
        const startDate: Date = rangeControlStartValue ? rangeControlStartValue : this._defaultStartDate;
        salary.startDate.setFullYear(startDate.getFullYear());
        this.renderEmployeeViewModel.updateEmployeeSalary({
            ...salary,
            wage: {
                isChangeMode: salary.wage.isChangeMode,
                value: +salary.wage.value
            },
            rate: {
                isChangeMode: salary.rate.isChangeMode,
                value: +salary.rate.value
            },
            bonus: {
                isChangeMode: salary.bonus.isChangeMode,
                value: +salary.bonus.value
            },

        }, employeeId);
    }

    public changeMode(salary: Salary, fieldType: string): void {
        if (!this.isCellChangeMode) {
            // @ts-ignore
            salary[fieldType].isChangeMode = !salary[fieldType].isChangeMode;
            this.isCellChangeMode = true;
        }

    }

    public handleEscape(salary: Salary, fieldType: string) {
        this.isCellChangeMode = false;
        // @ts-ignore
        salary[fieldType].isChangeMode = false;
    }

    private _defineMonths(from: Date, to: Date): IMonthWithYear[] {
        const monthsWithYear: IMonthWithYear[] = [];
        for (let year = from.getFullYear(); year <= to.getFullYear(); year++) {
            const fromMonth: number = year === from.getFullYear() ? from.getMonth() : 0;
            const toMonth: number = year === to.getFullYear() ? to.getMonth() : 11;
            for (let month = fromMonth; month <= toMonth; month++) {
                monthsWithYear.push({
                    month: {
                        name: months[month].name,
                        date: new Date(year, month),
                    },
                    year
                });
            }
        }
        return monthsWithYear;
    }
}

interface IMonthWithYear {
    month: IMonth;
    year: number;
}
