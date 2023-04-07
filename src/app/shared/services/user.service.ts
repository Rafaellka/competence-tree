import {Injectable} from '@angular/core';
import {INode, ISkill, IUser} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {concatMap, map, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user: IUser;
    private userSkills: ISkill[];
    private URL = `https://localhost:8000/api/`;

    constructor(private http: HttpClient, private oidc: OidcSecurityService) {
    }

    addSkillToUser(skill: INode) {
        return this.oidc.getAccessToken().pipe(
            concatMap(token =>
                this.http.post(this.URL + `employees/${this.user.id}/skills`, {
                        skillId: skill.id.split(':')[1]
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                ).pipe(
                    concatMap(() => of(skill))
                )
            )
        );
    }

    loadUserSkills() {
        const userId = this.user.id;
        this.oidc.getAccessToken().pipe(
            concatMap(token => this.http.get<{
                    skill: {
                        id: number;
                        title: string;
                        type: string;
                    }
                }[]>(this.URL + `employees/${userId}/skills`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
            )
        ).subscribe(skills => {
            this.userSkills = skills.map(skill => ({
                type: 'skill',
                name: skill.skill.title,
                id: 'skill:' + skill.skill.id
            }));
            console.log(skills)
        });
    }

    loadUserData() {
        this.oidc.getUserData()
            .pipe(
                map(data =>
                    ({
                        lastName: data.family_name,
                        firstName: data.given_name,
                        patronymic: data.middle_name,
                        id: data.sub,
                        isAdmin: !!data.role,
                        token: ''
                    }) as IUser
                ),
                concatMap(user => {
                    return this.oidc.getAccessToken().pipe(
                        concatMap(token => of({
                            ...user,
                            token
                        }))
                    )
                })
            )
            .subscribe(data => {
                console.log(data)
                if (!data) return;
                this.user = data;
            })
    }

    getMyId() {
        return this.user.id;
    }

    getUser() {
        return this.user;
    }

    pushSkill(skill: INode) {
        this.userSkills.push(skill);
    }

    getUserSkills() {
        return this.userSkills;
    }
}
