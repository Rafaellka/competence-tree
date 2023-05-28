import {IChangeableField, ISalary} from "../interfaces/ISalary";

export class Salary implements ISalary {
    public wage: IChangeableField<number>;
    public bonus: IChangeableField<number>;
    public startDate: Date;
    public employeeId: string;
    public rate: IChangeableField<number>;
    public id?: number;

    constructor(salary: ISalary) {
        this.wage = salary.wage;
        this.bonus = salary.bonus;
        this.startDate = salary.startDate;
        this.employeeId = salary.employeeId;
        this.rate = salary.rate;
        this.id = salary.id;
    }

}