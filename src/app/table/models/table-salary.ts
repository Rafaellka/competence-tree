import {Salary} from "./salary";
import {ISalary} from "../interfaces/ISalary";

export class TableSalary extends Salary {
    constructor(salary: ISalary) {
        super(salary);
    }
}