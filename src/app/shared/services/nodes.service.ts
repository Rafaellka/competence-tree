import {Injectable} from '@angular/core';
import {IHaveIdAndTitle, INode, IRenderNode, IResponse, nodeStyles, NodeTypes, userNodeStyles} from "../interfaces";
import {concatMap, forkJoin, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NodesService {
    private graphNodes: IRenderNode[] = [{
        name: 'Artsofte',
        id: 'MainNode',
        type: 'main',
        symbolSize: 26,
        itemStyle: {
            color: '#2E62D9'
        },
        parentId: null
    }];

    constructor(private http: HttpClient, private userService: UserService) {
    }

    private getEntityByGrade(gradeId: number, type: NodeTypes): Observable<IRenderNode[]> {
        return this.http.get<IHaveIdAndTitle[]>(environment.apiURL + `grades/${gradeId}/${type}s`)
            .pipe(
                map(res => (res.map(entity => ({
                            id: type + ':' + entity.id,
                            type: type,
                            name: entity.title,
                            parentId: 'grade:' + gradeId
                        }) as INode)
                            .map(entity => {
                                const userNodes = this.userService.getUserSkills();
                                if (userNodes && userNodes.find(userNode => userNode.id === entity.id)) {
                                    return {...entity, ...userNodeStyles}
                                }
                                return {...entity, ...nodeStyles[entity.type]}
                            })
                    )
                )
            );
    }

    getAllRoles(): Observable<IRenderNode[]> {
        return this.http.get<IResponse<IHaveIdAndTitle>>(environment.apiURL + 'roles')
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

    getSkillsByGrade(gradeId: number): Observable<IRenderNode[]> {
        return this.getEntityByGrade(gradeId, 'skill');
    }

    getPositionsByGrade(gradeId: number): Observable<IRenderNode[]> {
        return this.getEntityByGrade(gradeId, 'position');
    }

    getGraphNodes(): IRenderNode[] {
        return this.graphNodes;
    }

    getGradesByRole(roleId: string): Observable<IRenderNode[]> {
        return this.http.get<IHaveIdAndTitle[]>(environment.apiURL + `roles/${roleId}/grades`)
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

    findSkillByGradeId(gradeId: string | null) {
        return this.graphNodes.filter(node => node.parentId === gradeId && node.type === 'skill');
    }

    findMarkedSkills(skills: IRenderNode[]) {
        return skills.filter(node => node.itemStyle.color === '#A1DE93')
    }

    addNewNodes(newNodes: IRenderNode[]): void {
        this.graphNodes = [...this.graphNodes, ...newNodes];
    }

    getFilteredNodes(filters: NodeTypes[]): IRenderNode[] {
        filters = [...filters, 'main', 'role', 'grade'];
        return this.graphNodes.filter(node => filters.includes(node.type));
    }

    getNodesBySomeType(type: NodeTypes): IRenderNode[] {
        return this.graphNodes.filter(node => node.type === type);
    }

    getRolesWithGrades() {
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

    saveNewRole(name: string): Observable<number> {
        return this.http.post<number>(environment.apiURL + 'roles', {
            title: name
        }, {
            headers: {
                'Authorization': this.userService.getUser().token
            }
        })
    }

    saveNewGrade(name: string, roleId: string, prevGradeId?: string) {
        const body: any = {
            title: name
        }
        if (prevGradeId) {
            body['prevGradeId'] = Number(prevGradeId.split(':')[1]);
        }
        return this.http.post(environment.apiURL + `roles/${roleId.split(':')[1]}/grades`, body, {
            headers: {
                'Authorization': this.userService.getUser().token
            }
        });
    }

    saveNewPosition(name: string, parent: INode) {
        return this.http.post(environment.apiURL + 'positions', {
            title: name
        }, {
            headers: {
                'Authorization': this.userService.getUser().token
            }
        }).pipe(
            concatMap(id => this.createGradePosition(Number(id), parent)
                .pipe(
                    concatMap(() => of(id))
                )
            )
        );
    }

    createGradePosition(positionId: number, parent: INode) {
        const parentId = parent.id.split(':')[1];
        return this.http.post(environment.apiURL + `grades/${parentId}/positions`, {
            positionId
        }, {
            headers: {
                'Authorization': this.userService.getUser().token
            }
        })
    }

    saveNewSkill(name: string, parent: INode) {
        return this.http.post(environment.apiURL + 'skills', {
            title: name,
            type: 'Theoretical'
        }, {
            headers: {
                'Authorization': this.userService.getUser().token
            }
        }).pipe(
            concatMap(id => this.createGradeSkill(Number(id), parent)
                .pipe(
                    concatMap(() => of(id))
                )
            )
        );
    }

    createGradeSkill(skillId: number, parent: INode) {
        const parentId = parent.id.split(':')[1];
        return this.http.post(environment.apiURL + `grades/${parentId}/skills`, {
            skillId
        }, {
            headers: {
                'Authorization': this.userService.getUser().token
            }
        })
    }

    changeSkillColor(skillId: string) {
        const index = this.graphNodes.findIndex(node => node.id === skillId);
        this.graphNodes[index] = {...this.graphNodes[index], ...userNodeStyles};
    }

    changeGradeColor(gradeId: string | null) {
        const index = this.graphNodes.findIndex(node => node.id === gradeId);
        this.graphNodes[index] = {...this.graphNodes[index], itemStyle: {...userNodeStyles.itemStyle}};
    }

    deleteNode(deletedNode: INode) {
        let parentNode = this.graphNodes.find(node => node.id === deletedNode.parentId) || this.graphNodes[0];
        if (deletedNode.type === 'role' || deletedNode.type === 'position') {
            const id = deletedNode.id.split(':')[1];
            return this.http.delete(environment.apiURL + `${deletedNode.type}s/${id}`, {
                headers: {
                    'Authorization': this.userService.getUser().token
                }
            });
        } else {
            const parentId = parentNode.id.split(':')[1];
            const childId = deletedNode.id.split(':')[1];
            return this.http.delete(environment.apiURL + `${parentNode.type}s/${parentId}/${deletedNode.type}s/${childId}`, {
                headers: {
                    'Authorization': this.userService.getUser().token
                }
            });
        }
    }

    removeNodeFromGraph(id: string) {
        this.graphNodes = this.graphNodes.filter((node) => node.id !== id);
    }

    setIsParentNode(id: string) {
        const node = this.graphNodes.find(value => value.id === id);
        if (node) {
            node.isParentNode = true;
        }
    }

    checkIsParent(id: string) {
        const node = this.graphNodes.find(value => value.id === id);
        return !!node?.isParentNode;
    }

    resetNodes() {
        this.graphNodes = [this.graphNodes[0]];
    }
}