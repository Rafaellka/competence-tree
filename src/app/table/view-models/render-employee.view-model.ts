import {BehaviorSubject, concatMap, Observable, tap} from "rxjs";
import {EmployeeService} from "../services/employee.service";
import {RenderEmployee} from "../models/render-employee";
import {TableSalary} from "../models/table-salary";
import {IEmployee} from "../interfaces/IEmployee";

export class RenderEmployeeViewModel {
    public employees$: Observable<RenderEmployee[]>;
    private _employees$: BehaviorSubject<RenderEmployee[]>;
    private _employeeRenderList: RenderEmployee[] = [];

    constructor(private _employeeService: EmployeeService) {
        this._employees$ = new BehaviorSubject<RenderEmployee[]>([]);
        this.employees$ = this._employees$.asObservable();
    }

    public initializeList(userId: string, year: string) {
        this._employeeService.loadEmployeeById(userId, year)
            .pipe(
                tap((employee) => {
                    this._employeeRenderList.push(employee);
                }),
                concatMap((employee) => this._employeeService.loadSubordinates(userId, year))
            )
            .subscribe((emp: RenderEmployee[]) => {
                this._employeeRenderList.push(...emp);
                this._employees$.next(this._employeeRenderList);
            });
    }

    public loadSubordinates(employeeId: string, year: string) {
        if (this._employeeRenderList.find(emp => emp.manager?.id === employeeId)) {
            return;
        }
        this._employeeService.loadSubordinates(employeeId, year)
            .subscribe(employees => {
                const index = this._employeeRenderList.findIndex(employee => employee.id === employeeId);
                this._employeeRenderList.splice(index + 1, 0, ...employees);
                this._employees$.next(this._employeeRenderList);
            });
    }

    public updateEmployeeSalary(newSalary: TableSalary, employeeId: string) {
        this._employeeService.saveFieldChanges(newSalary, employeeId)
            .subscribe((value) => {
                const emp = this._employeeRenderList.find((emp: IEmployee) => emp.id === newSalary.employeeId);
                if (!emp) {
                    throw new Error('Пользователь отсутвует в списке')
                }
                const salaryIndex = emp.salaries.findIndex(salary => salary.startDate === newSalary.startDate);
                if (!salaryIndex) {
                    return;
                }

                emp.salaries[salaryIndex] = newSalary;
                this._employees$.next(this._employeeRenderList);
            })
    }

    public hideSubordinates(employeeId: string) {
        if (employeeId === this._employeeRenderList[0].id) {
            this._employeeRenderList = [this._employeeRenderList[0]];
            this._employees$.next(this._employeeRenderList);
            return;
        }
        const removeSubIndex = this._employeeRenderList.findIndex(employee => employee.id === employeeId);
        const managerId = this._employeeRenderList[removeSubIndex].manager?.manager?.id || this._employeeRenderList[0].id;
        const subs = (this._employeeRenderList.filter(employee => employee.manager?.id === managerId) || [])
            .map(sub => sub.id);
        const nextSameLevelSubIndex = this._employeeRenderList
            .slice(removeSubIndex + 1)
            .findIndex(employee => subs.includes(employee.id)) + removeSubIndex + 1;
        this._employeeRenderList.splice(removeSubIndex + 1, nextSameLevelSubIndex - removeSubIndex - 1);
        this._employees$.next(this._employeeRenderList);
    }

    public resetList() {
        this._employeeRenderList = [];
        this._employees$.next(this._employeeRenderList);
    }
}