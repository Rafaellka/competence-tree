import {Injectable} from '@angular/core';
import {INode, ISkill, IUserInfo} from "../../interfaces";
import {HttpClient} from "@angular/common/http";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {concatMap, map, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userInfo: IUserInfo;
    private userSkills: ISkill[];
    private URL = `https://localhost:8000/api/`;

    constructor(private http: HttpClient, private oidc: OidcSecurityService) {
    }

    addSkill(skill: INode) {
        return this.oidc.getAccessToken().pipe(
            concatMap(token =>
                this.http.put(this.URL + `employees/${this.userInfo.id}/skills/add/${skill.id.split(':')[1]}`, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).pipe(concatMap(() => of(skill)))
            )
        );
    }

    loadUserSkills() {
        const userId = this.userInfo.id;
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


    pushSkill(skill: INode) {
        this.userSkills.push(skill);
    }

    getUserSkills() {
        return this.userSkills;
    }

    setUserData() {
        this.oidc.getUserData().pipe(
            map(data => ({
                lastName: data.family_name,
                firstName: data.given_name,
                patronymic: data.middle_name,
                name: data.name,
                id: data.sub,
                isAdmin: !!data.role,
            }) as IUserInfo),
            concatMap(user => {
                return this.oidc.getAccessToken().pipe(
                    concatMap(token => {
                        return of({
                            user: user as IUserInfo,
                            token: 'Bearer ' + token
                        })
                    })
                )
            })
        ).subscribe(data => {
            if (!data) return;
            this.userInfo = {...data.user, token: data.token};
        })
    }

    getUserId() {
        return this.userInfo.id;
    }

    getUser() {
        return this.userInfo;
    }
}
