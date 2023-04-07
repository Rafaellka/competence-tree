import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../shared/services/user.service";

export interface IEmployee {

}

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    public employees$ = new BehaviorSubject<IEmployee[]>([]);
    private employees: IEmployee[];
    private URL = 'https://localhost:8080/api';

    constructor(private http: HttpClient, private userService: UserService) {
    }

    loadEmployees() {
        this.http.get<IEmployee[]>(this.URL + '').subscribe(employees => {
            this.employees = employees;
            this.employees$.next(this.employees);
        })
    }
}
