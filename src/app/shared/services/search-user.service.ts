import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponse, IUser} from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class SearchUserService {
    URL = 'https://localhost:5001/'
    constructor(private http: HttpClient) {
    }

    searchUsers(query: string) {
       return this.http.get<IResponse<IUser>>(this.URL + `users/search?query=${query}`, {});
    }

    getUserById(id: string) {
        return this.http.get<IUser>(this.URL + `users/${id}`);
    }
}
