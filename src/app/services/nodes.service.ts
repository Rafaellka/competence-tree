import {Injectable} from '@angular/core';
import {
    INode,
    IRenderNode,
    IResponse,
    IStandardItem,
    nodeStyles,
    NodeTypes, userNodeStyles
} from "../../interfaces";
import {concatMap, forkJoin, from, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class NodesService {
    private URL = `https://localhost:8000/api/`;
    private graphNodes: IRenderNode[] = [{
        name: 'Artsofte',
        id: 'MainNode',
        type: 'main',
        symbolSize: 26,
        itemStyle: {
            color: '#2E62D9'
        },
        parentId: null,
        x: 0,
        y: 0
    }];

    constructor(private http: HttpClient, private userService: UserService) {
    }

    private getNodesOfType(url: string, type: NodeTypes): Observable<IRenderNode[]> {
        return this.http.get<IResponse<IStandardItem>>(url)
            .pipe(
                map((res) => res.items
                    .map(item => ({
                        name: item.title,
                        type: type,
                        id: type + ':' + item.id
                    }) as INode)
                    .map((node) => ({
                        ...node,
                        ...nodeStyles[node.type]
                    }) as IRenderNode)
                )
            )
    }

    private getEntityByGrade(gradeId: number, type: NodeTypes): Observable<IRenderNode[]> {
        return this.http.get<IStandardItem[]>(this.URL + `grades/${gradeId}/${type}s`)
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
        return this.getNodesOfType(this.URL + 'roles', 'role');
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
        return this.http.get<IStandardItem[]>(this.URL + `roles/${roleId}/grades`)
            .pipe(
                map(res => (res.map(grade => ({
                            id: 'grade:' + grade.id,
                            type: 'grade',
                            name: grade.title,
                            parentId: 'role:' + roleId
                        }) as INode)
                            .map((grade) => ({
                                ...grade, ...nodeStyles[grade.type]
                            }) as IRenderNode)
                    )
                )
            )
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
            concatMap((roles) => forkJoin([
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
        return this.http.post<number>(this.URL + 'roles', {
            title: name
        })
    }

    saveNewGrade(name: string, roleId: string, prevGradeId?: string) {
        const body: any = {
            title: name
        }
        if (prevGradeId) {
            body['prevGradeId'] = Number(prevGradeId.split(':')[1]);
        }
        return this.http.post(this.URL + `roles/${roleId.split(':')[1]}/grades`, body);
    }

    saveNewPosition(name: string, parent: INode) {
        return this.http.post(this.URL + 'positions', {
            title: name
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
        return this.http.put(this.URL + `grades/${parentId}/positions/add/${positionId}`, {
            gradeId: parentId,
            positionId
        })
    }

    saveNewSkill(name: string, parent: INode) {
        return this.http.post(this.URL + 'skills', {
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

    changeSkill(skillId: string) {
        const index = this.graphNodes.findIndex(node => node.id === skillId);
        this.graphNodes[index] = {...this.graphNodes[index], ...userNodeStyles};
    }

    createGradeSkill(skillId: number, parent: INode) {
        const parentId = parent.id.split(':')[1];
        return this.http.put(this.URL + `grades/${parentId}/skills/add/${skillId}`, {
            gradeId: parentId,
            skillId
        })
    }

    deleteNode(deletedNode: INode) {
        let parentNode = this.graphNodes.find(node => node.id === deletedNode.parentId) || this.graphNodes[0];
        if (deletedNode.type === 'role' || deletedNode.type === 'position') {
            const id = deletedNode.id.split(':')[1];
            return this.http.delete(this.URL + `${deletedNode.type}s/${id}`);
        } else {
            const parentId = parentNode.id.split(':')[1];
            const childId = deletedNode.id.split(':')[1];
            return this.http.delete(this.URL + `${parentNode.type}s/${parentId}/${deletedNode.type}s/${childId}`);
        }
    }

    removeNode(id: string) {
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
        this.graphNodes = [{
            name: 'Artsofte',
            id: 'MainNode',
            type: 'main',
            symbolSize: 26,
            itemStyle: {
                color: '#2E62D9'
            },
            parentId: null
        }];
    }
}
