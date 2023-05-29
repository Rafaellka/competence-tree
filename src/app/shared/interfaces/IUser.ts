import {IBaseUserInfo} from "./IBaseUserInfo";

export interface IUser extends IBaseUserInfo{
    isAdmin: boolean;
    token: string;
    managerId: string;
}
