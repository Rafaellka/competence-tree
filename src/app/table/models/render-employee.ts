import {Employee} from "./employee";
import {IEmployee} from "../interfaces/IEmployee";

export class RenderEmployee extends Employee {
    public isExpandMore?: boolean;

    constructor(employee: IEmployee) {
        super(employee);
    }

}