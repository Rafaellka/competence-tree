import {Injectable} from '@angular/core';
import {INode, ISkill} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {BehaviorSubject, Observable, concatMap, map, of} from "rxjs";
import {IUser} from "../interfaces/IUser";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private manager: IUser = {
        firstName: '',
        lastName: '',
        id: '',
        managerId: '',
        patronymic: '',
        isAdmin: false,
        token: ''
    };
    private _manager$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.manager);
    public manager$: Observable<IUser>;

    private user: IUser;
    private userSkills: ISkill[];
    constructor(private http: HttpClient, private oidc: OidcSecurityService) {
        this.manager$ = this._manager$.asObservable();
    }

    addSkillToUser(skill: INode) {
        return this.oidc.getAccessToken().pipe(
            concatMap(token =>
                this.http.post(environment.apiURL + `employees/${this.user.id}/skills`, {
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
                }[]>(environment.apiURL + `employees/${userId}/skills`, {
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
                            token: 'Bearer ' + token
                        }))
                    )
                })
            )
            .subscribe(data => {
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

    appointManager(employeeId: string, managerId: string) {
        return this.http.post<IUser>(environment.apiURL + `employees/${employeeId}/manager`, {
            employeeId: employeeId,
            managerId: managerId
        }).subscribe(value => {
            console.log(value);
            this.manager = value;
            this._manager$.next(this.manager);
        });
    }
}
