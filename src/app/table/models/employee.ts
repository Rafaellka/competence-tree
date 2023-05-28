import {EmployeeType, IEmployee} from "../interfaces/IEmployee";
import {Salary} from "./salary";

export class Employee implements IEmployee {
    public id: string;
    public type: EmployeeType;
    public patronymic: string;
    public firstName: string;
    public lastName: string;
    public manager: Employee | null;
    public salaries: Salary[];

    constructor(employee: IEmployee) {
        this.id = employee.id;
        this.type = employee.type;
        this.patronymic = employee.patronymic;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.manager = employee.manager;
        this.salaries = employee.salaries;
    }
}