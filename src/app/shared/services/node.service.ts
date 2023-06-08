import {Injectable} from '@angular/core';
import {IHaveIdAndTitle, INode, IRenderNode, IResponse, nodeStyles, NodeTypes, userNodeStyles} from "../interfaces";
import {concatMap, forkJoin, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NodeService {
    private _graphNodes: IRenderNode[] = [{
        name: 'Artsofte',
        id: 'MainNode',
        type: 'main',
        symbolSize: 26,
        itemStyle: {
            color: '#2E62D9'
        },
        parentId: null
    }];

    constructor(
        private _http: HttpClient,
        private _userService: UserService
    ) {
    }

    public getAllRoles(): Observable<IRenderNode[]> {
        return this._http.get<IResponse<IHaveIdAndTitle>>(environment.apiURL + 'roles')
            .pipe(
                map(res => res.items
                    .map(item => ({
                        name: item.title,
                        type: 'role',
                        id: 'role:' + item.id,
                        ...nodeStyles['role']
                    }) as IRenderNode)
                )
            )
    }

    public getSkillsByGrade(gradeId: number): Observable<IRenderNode[]> {
        return this.getEntityByGrade(gradeId, 'skill');
    }

    public getPositionsByGrade(gradeId: number): Observable<IRenderNode[]> {
        return this.getEntityByGrade(gradeId, 'position');
    }

    public getGraphNodes(): IRenderNode[] {
        return this._graphNodes;
    }

    public getGradesByRole(roleId: string): Observable<IRenderNode[]> {
        return this._http.get<IHaveIdAndTitle[]>(environment.apiURL + `roles/${roleId}/grades`)
            .pipe(
                map(res => (res.map(grade => ({
                            id: 'grade:' + grade.id,
                            type: 'grade',
                            name: grade.title,
                            parentId: 'role:' + roleId,
                            ...nodeStyles['grade']
                        }) as IRenderNode)
                    )
                )
            )
    }

    public findSkillByGradeId(gradeId: string | null) {
        return this._graphNodes.filter(node => node.parentId === gradeId && node.type === 'skill');
    }

    public findMarkedSkills(skills: IRenderNode[]) {
        return skills.filter(node => node.itemStyle.color === '#A1DE93')
    }

    public addNewNodes(newNodes: IRenderNode[]): void {
        this._graphNodes = [...this._graphNodes, ...newNodes];
    }

    public getFilteredNodes(filters: NodeTypes[]): IRenderNode[] {
        filters = [...filters, 'main', 'role', 'grade'];
        return this._graphNodes.filter(node => filters.includes(node.type));
    }

    public getNodesBySomeType(type: NodeTypes): IRenderNode[] {
        return this._graphNodes.filter(node => node.type === type);
    }

    public getRolesWithGrades() {
        return this.getAllRoles().pipe(
            concatMap((roles) =>
                forkJoin([
                    ...roles.map(role => this.getGradesByRole(role.id.split(':')[1]))
                ]).pipe(
                    concatMap((grades) => {
                        return of([roles], grades);
                    })
                )
            )
        )
    }

    public saveNewRole(name: string): Observable<number> {
        return this._http.post<number>(environment.apiURL + 'roles', {
            title: name
        })
    }

    public saveNewGrade(name: string, roleId: string, prevGradeId?: string) {
        const body: any = {
            title: name
        }
        if (prevGradeId) {
            body['prevGradeId'] = Number(prevGradeId.split(':')[1]);
        }
        return this._http.post(environment.apiURL + `roles/${roleId.split(':')[1]}/grades`, body);
    }

    public saveNewPosition(name: string, parent: INode) {
        return this._http.post(environment.apiURL + 'positions', {
                title: name
            }
        )
            .pipe(
                concatMap(id => this.createGradePosition(Number(id), parent)
                    .pipe(
                        concatMap(() => of(id))
                    )
                )
            );
    }

    public createGradePosition(positionId: number, parent: INode) {
        const parentId = parent.id.split(':')[1];
        return this._http.post(environment.apiURL + `grades/${parentId}/positions`, {
            positionId
        });
    }

    public saveNewSkill(name: string, parent: INode) {
        return this._http.post(environment.apiURL + 'skills', {
            title: name,
            type: 'Theoretical'
        }).pipe(
            concatMap(id => this.createGradeSkill(Number(id), parent)
                .pipe(
                    concatMap(() => of(id))
                )
            )
        );
    }

    public createGradeSkill(skillId: number, parent: INode) {
        const parentId = parent.id.split(':')[1];
        return this._http.post(environment.apiURL + `grades/${parentId}/skills`, {
            skillId
        })
    }

    public saveNewDuty(title: string, description: string, positionId: number) {
        return this._http.post<number>(environment.apiURL + 'duties', {
            title,
            description
        })
            .pipe(
                concatMap((dutyId: number) => this.createPositionDuty(positionId, dutyId))
            )
    }

    public getDutiesByPositionId(positionId: string) {
        return this._http.get<IHaveIdAndTitle[]>(environment.apiURL + `positions/${positionId}/duties`);
    }

    public getSubskillBySkillId(skillId: string) {
        return this._http.get<IHaveIdAndTitle[]>(environment.apiURL + `skills/${skillId}/sub-skills`);
    }

    public createDuty(title: string) {
        return this._http.post<number>(environment.apiURL + 'duties', {title, description: ''})
    }

    public createPositionDuty(positionId: number, dutyId: number) {
        return this._http.post(environment.apiURL + `positions/${positionId}/duties`, {
            dutyId
        });
    }

    public deleteDutyFromPosition(positionId: string, dutyId: string) {
        return this._http.delete(environment.apiURL + `positions/${positionId}/duties/${dutyId}`);
    }

    public createSubSkill(skillId: string) {

    }

    public changeSkillColor(skillId: string) {
        const index = this._graphNodes.findIndex(node => node.id === skillId);
        this._graphNodes[index] = {...this._graphNodes[index], ...userNodeStyles};
    }

    public changeGradeColor(gradeId: string | null) {
        const index = this._graphNodes.findIndex(node => node.id === gradeId);
        this._graphNodes[index] = {...this._graphNodes[index], itemStyle: {...userNodeStyles.itemStyle}};
    }

    public deleteNode(deletedNode: INode) {
        let parentNode = this._graphNodes.find(node => node.id === deletedNode.parentId) || this._graphNodes[0];
        if (deletedNode.type === 'role' || deletedNode.type === 'position') {
            const id = deletedNode.id.split(':')[1];
            return this._http.delete(environment.apiURL + `${deletedNode.type}s/${id}`);
        } else {
            const parentId = parentNode.id.split(':')[1];
            const childId = deletedNode.id.split(':')[1];
            return this._http.delete(environment.apiURL + `${parentNode.type}s/${parentId}/${deletedNode.type}s/${childId}`);
        }
    }

    public removeNodeFromGraph(id: string) {
        this._graphNodes = this._graphNodes.filter((node) => node.id !== id);
    }

    public setIsParentNode(id: string) {
        const node = this._graphNodes.find(value => value.id === id);
        if (node) {
            node.isParentNode = true;
        }
    }

    public checkIsParent(id: string) {
        const node = this._graphNodes.find(value => value.id === id);
        return !!node?.isParentNode;
    }

    public resetNodes() {
        this._graphNodes = [this._graphNodes[0]];
    }

    private getEntityByGrade(gradeId: number, type: NodeTypes): Observable<IRenderNode[]> {
        return this._http.get<IHaveIdAndTitle[]>(environment.apiURL + `grades/${gradeId}/${type}s`)
            .pipe(
                map(res => (res.map(entity => ({
                            id: type + ':' + entity.id,
                            type: type,
                            name: entity.title,
                            parentId: 'grade:' + gradeId
                        }) as INode)
                            .map(entity => {
                                const userNodes = this._userService.getUserSkills();
                                if (userNodes && userNodes.find(userNode => userNode.id === entity.id)) {
                                    return {...entity, ...userNodeStyles}
                                }
                                return {...entity, ...nodeStyles[entity.type]}
                            })
                    )
                )
            );
    }
}
