import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {concatMap, forkJoin, map, take, tap} from "rxjs";
import {EmployeeType, IEmployee} from "../interfaces/IEmployee";
import {environment} from "../../../environments/environment";
import {ISalary} from "../interfaces/ISalary";
import {months} from "../interfaces/IMonth";
import {RenderEmployee} from "../models/render-employee";
import {TableSalary} from "../models/table-salary";
import {IBaseUserInfo} from "../../shared/interfaces/IBaseUserInfo";
import {IBaseSalary} from "../interfaces/IBaseSalary";
import {UserService} from "../../shared/services/user.service";

interface IGetSubordinatesResponse {
    subordinates: IGetEmployee[];
    manager: IEmployee;
}

interface IGetEmployee extends IBaseUserInfo {
    managerId: string;
    type: EmployeeType;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private _allLoadedEmployees: RenderEmployee[] = [];

    constructor(
        private _http: HttpClient,
        private _userService: UserService
    ) {
    }

    public loadEmployeeById(id: string, year: string) {
        return this._http.get<IGetEmployee>(environment.apiURL + `employees/${id}`)
            .pipe(
                map((user) => {
                    const employee: IEmployee = {
                        ...user,
                        manager: this._allLoadedEmployees.find(emp => emp.id === user.managerId) || null,
                        salaries: []
                    }
                    const emp = new RenderEmployee(employee);
                    if (emp.type === 'Manager') {
                        emp.isExpandMore = true;
                    }
                    return emp;
                }),
                concatMap((emp: RenderEmployee) =>
                    this._http.get<IBaseSalary[]>(environment.apiURL + 'salaries', {
                        params: {
                            employeeId: id,
                            from: `${year}-01-01T00:00:00Z`,
                            to: `${year}-12-31T23:59:59Z`
                        }
                    })
                        .pipe(
                            map((salaries: IBaseSalary[]) => salaries.map(salary => new TableSalary({
                                ...salary,
                                wage: {
                                    isChangeMode: false,
                                    value: salary.wage
                                },
                                bonus: {
                                    isChangeMode: false,
                                    value: salary.bonus
                                },
                                rate: {
                                    isChangeMode: false,
                                    value: salary.rate
                                },
                                startDate: new Date(salary.startDate)
                            }))),
                            map((salaries: TableSalary[]) => {
                                const changedSalaries: TableSalary[] = [];
                                for (let i = 0; i < 12; i++) {
                                    let salary = salaries.find(item => +item.startDate.getMonth() === i);
                                    if (!salary) {
                                        salary = new TableSalary(i !== 0 ? structuredClone(changedSalaries[changedSalaries.length - 1]) : {
                                            id: 0,
                                            employeeId: '',
                                            startDate: new Date(),
                                            bonus: {
                                                isChangeMode: false,
                                                value: 0
                                            },
                                            rate: {
                                                isChangeMode: false,
                                                value: 0
                                            },
                                            wage: {
                                                isChangeMode: false,
                                                value: 0
                                            },
                                        } as ISalary);
                                    }
                                    salary.startDate = months[i].startDate;
                                    changedSalaries.push(salary);
                                }
                                emp.salaries = changedSalaries;
                                return emp;
                            })
                        )
                ),
                tap((employee) => {
                    this._allLoadedEmployees.push(employee);
                })
            );
    }

    public loadSubordinates(managerId: string, year: string) {
        return this._http.get<IGetSubordinatesResponse>(environment.apiURL + `employees/${managerId}/subordinates`)
            .pipe(
                map(response => {
                        const manager = this._allLoadedEmployees.find(emp => emp.id === managerId) || null;
                        return response.subordinates
                            .map(sub => new RenderEmployee({...sub, manager, salaries: []}) as IEmployee)
                    }
                ),
                concatMap((subordinates: RenderEmployee[]) => {
                        const requests = subordinates.map((sub: IEmployee) => this._http.get<IBaseSalary[]>(environment.apiURL + `salaries`, {
                                params: {
                                    employeeId: sub.id,
                                    from: `${year}-01-01T00:00:00Z`,
                                    to: `${year}-12-31T23:59:59Z`
                                }
                            })
                                .pipe(
                                    map((salaries: IBaseSalary[]) => salaries.map(salary => new TableSalary({
                                        ...salary,
                                        wage: {
                                            isChangeMode: false,
                                            value: salary.wage
                                        },
                                        bonus: {
                                            isChangeMode: false,
                                            value: salary.bonus
                                        },
                                        rate: {
                                            isChangeMode: false,
                                            value: salary.rate
                                        },
                                        startDate: new Date(salary.startDate)
                                    })))
                                )
                        );
                        return forkJoin(requests)
                            .pipe(
                                map(salaryArrays => salaryArrays.map(
                                        (salaries, index) => {
                                            const changedSalaries: TableSalary[] = [];

                                            for (let i = 0; i < 12; i++) {
                                                let salary = salaries.find(item => item.startDate.getMonth() === i);
                                                if (!salary) {
                                                    salary = new TableSalary(i !== 0 ? structuredClone(changedSalaries[changedSalaries.length - 1]) : {
                                                        id: 0,
                                                        employeeId: '',
                                                        startDate: new Date(),
                                                        bonus: {
                                                            isChangeMode: false,
                                                            value: 0
                                                        },
                                                        rate: {
                                                            isChangeMode: false,
                                                            value: 0
                                                        },
                                                        wage: {
                                                            isChangeMode: false,
                                                            value: 0
                                                        },
                                                    });
                                                }
                                                salary.startDate = months[i].startDate;
                                                changedSalaries.push(salary);
                                                subordinates[index].salaries = changedSalaries;
                                            }

                                            return subordinates[index];
                                        }
                                    )
                                )
                            );
                    }
                ),
                tap((employees) => {
                    this._allLoadedEmployees.push(...employees);
                }),
                take(1),
            )
    }

    public saveFieldChanges(salary: TableSalary, employeeId: string) {
        delete salary.id;

        return this._http.post(environment.apiURL + 'salaries', {
            wage: salary.wage.value,
            rate: salary.rate.value,
            bonus: salary.bonus.value,
            startDate: salary.startDate,
            employeeId
        });
    }
}
