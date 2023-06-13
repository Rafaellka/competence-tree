import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IDuty, IHaveIdAndTitle, ISkill} from "../interfaces";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NodeInfoService {

    constructor(private http: HttpClient) {
    }

    public getPositionDuties(positionId: string): Observable<IDuty[]> {
        return this.http.get<{ title: string; description: string; }[]>(environment.apiURL + `positions/${positionId}/duties`)
            .pipe(
                map(duties => duties.map(duty => ({
                            name: duty.title,
                            description: duty.description
                        })
                    )
                )
            )
    }

    public getDetailedSkill(skillId: string): Observable<ISkill[]> {
        return this.http.get<IHaveIdAndTitle[]>(environment.apiURL + `skills/${skillId}/sub-skills`)
            .pipe(
                map(skills => skills
                    .map(skill => ({
                        id: 'skill:' + skill.id,
                        name: skill.title
                    }) as ISkill))
            )
    }
}
