import {Injectable} from '@angular/core';
import {INode, ISkill, IUserData} from "../../interfaces";
import {HttpClient} from "@angular/common/http";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {concatMap, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user: IUserData;
    private userSkills: ISkill[];
    private URL = `https://localhost:8000/api/`;

    constructor(private http: HttpClient, private oidc: OidcSecurityService) {
    }

    addSkill(skill: INode) {
        return this.oidc.getAccessToken().pipe(
            concatMap(token =>
                this.http.put(this.URL + `employees/${this.user.userId}/skills/add/${skill.id.split(':')[1]}`, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).pipe(concatMap(() => of(skill)))
            )
        );
    }

    loadUserSkills() {
        const userId = this.user.userId;
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
        this.oidc.getUserData().subscribe(data => {
            if (!data) {
                console.log(data);
                return;
            }
            this.user = {
                familyName: data.family_name,
                givenName: data.given_name,
                middleName: data.middle_name,
                name: data.name,
                userId: data.sub,
                isAdmin: !!data.role
            }
        })
    }

    getUser() {
        return this.user;
    }
}