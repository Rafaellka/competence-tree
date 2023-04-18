import {Injectable} from '@angular/core';
import {ISalary} from "../interfaces/ISalary";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SalaryService {
    salaries$ = new BehaviorSubject<ISalary[]>([]);
    private _salaries: ISalary[];

    constructor(private http: HttpClient) {
    }

    loadSelfSalary(id: string) {
        this.http.get(environment.apiURL)
    }

    loadSubordinatesSalaries(id: string) {
        this.http.get(environment.apiURL)
    }
}
