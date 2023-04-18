import {IBaseUserInfo} from "../../shared/interfaces/IBaseUserInfo";

export interface IEmployee extends IBaseUserInfo {
    manager: IEmployee | null;
    type: 'Default' | 'Manager';
}