import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../interfaces";
import {IUser} from "../interfaces/IUser";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SearchUserService {
    constructor(private http: HttpClient) {
    }

    searchUsers(query: string) {
       return this.http.get<IResponse<IUser>>(environment.apiURL + `employees/search?query=${query}`, {});
    }

    getUserById(id: string) {
        return this.http.get<IUser>(environment.apiURL + `employees/${id}`);
    }
}
