import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {IEmployee} from "../interfaces/IEmployee";
import {environment} from "../../../environments/environment";

interface IGetSubordinatesResponse {
    subordinates: IEmployee[];
    manager: IEmployee;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    public subordinates$ = new BehaviorSubject<IEmployee[]>([]);
    private _subordinates: IEmployee[] = [];
    constructor(private http: HttpClient) {
    }

    loadUserById(id: string) {
        this.http.get<IEmployee>(environment.apiURL + `employees/${id}`)
            .subscribe(selfInfo => {
                this._subordinates.push(selfInfo);
                this.subordinates$.next(this._subordinates);
            })
    }

    loadSubordinates(managerId: string) {
        if (this._subordinates.find(emp => emp.manager?.id === managerId)) {
            return;
        }
        this.http.get<IGetSubordinatesResponse>(environment.apiURL + `employees/${managerId}/subordinates`)
            .pipe(
                map(response => response.subordinates.map(sub =>
                    ({...sub, manager: response.manager}) as IEmployee)
                )
            )
            .subscribe(employees => {
                this._subordinates.push(...employees);
                this.subordinates$.next(this._subordinates);
            })
    }
}
