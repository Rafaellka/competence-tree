import {IBaseUserInfo} from "../../shared/interfaces/IBaseUserInfo";
import {Salary} from "../models/salary";

export type EmployeeType = 'Default' | 'Manager';

export interface IEmployee extends IBaseUserInfo {
    manager: IEmployee | null;
    type: EmployeeType;
    salaries: Salary[];
}