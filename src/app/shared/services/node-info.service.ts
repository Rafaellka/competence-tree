import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IDuty, ISkill, IStandardItem} from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class NodeInfoService {

    constructor(private http: HttpClient) {
    }

    getPositionDuties(positionId: number): Observable<IDuty[]> {
        return this.http.get<{ title: string; description: string; }[]>(`https://localhost:8000/api/positions/${positionId}/duties`)
            .pipe(
                map(duties => duties.map(duty => ({
                            name: duty.title,
                            description: duty.description
                        })
                    )
                )
            )
    }

    getDetailedSkill(skillId: string): Observable<ISkill[]> {
        return this.http.get<IStandardItem[]>(`https://localhost:8000/api/skills/${skillId}/sub-skills`)
            .pipe(
                map(skills => skills
                    .map(skill => ({
                        id: 'skill:' + skill.id,
                        name: skill.title
                    }) as ISkill))
            )
    }
}
