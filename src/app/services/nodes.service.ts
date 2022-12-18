import {Injectable} from '@angular/core';
import {ILink, INode, IRenderNode, IRequest, ISkill, IStandartResponse, nodeStyles, NodeTypes} from "../../interfaces";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  graphNodes: IRenderNode[] = [{
    name: 'Artsofte',
    id: 'MainNode',
    type: 'main',
    symbolSize: 26,
    itemStyle: {
      color: '#2E62D9'
    },
  }];

  constructor(private http: HttpClient) {
  }

  private getNodesOfType(url: string, type: NodeTypes): Observable<IRenderNode[]> {
    return this.http.get<IRequest>(url)
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
          }))
        )
      )
  }

  getRoles(): Observable<IRenderNode[]> {
    return this.getNodesOfType('https://localhost:8000/api/roles', 'role');
  }

  getGrades(): Observable<IRenderNode[]> {
    return this.getNodesOfType('https://localhost:8000/api/grades', 'grade');
  }

  getSkillsByGrade(gradeId: number): Observable<ISkill[]> {
    return this.http.get<IStandartResponse[]>(`https://localhost:8000/api/grades/${gradeId}/skills`)
      .pipe(
        map(res => (res.map(skill => ({
              id: 'skill:' + skill.id,
              type: 'skill',
              name: skill.title,
            }) as INode)
              .map(skill => ({...skill, ...nodeStyles[skill.type], gradeId: 'grade:' + gradeId}) as ISkill)
          )
        )
      );
  }

  getSkills() {
    return this.getNodesOfType('https://localhost:8000/api/skills', 'skill');
  }

  getGraphNodes() {
    return this.graphNodes;
  }

  getGradeByRole(roleId: number): Observable<IRenderNode[]> {
    return this.http.get<IStandartResponse[]>(`https://localhost:8000/api/roles/${roleId}/grades`)
      .pipe(
        map(res => (res.map(grade => ({
              id: 'grade:' + grade.id,
              type: 'grade',
              name: grade.title
            }) as INode)
              .map((grade) => ({...grade, ...nodeStyles[grade.type]}) as IRenderNode)
          )
        )
      )
  }

  addNewNodes(newNodes: IRenderNode[]) {
    this.graphNodes = [...this.graphNodes, ...newNodes];
  }

  getFilteredNodes(filters: NodeTypes[]) {
    filters.push('main');
    filters.push('role');
    filters.push('grade');
    return this.graphNodes.filter(node => filters.includes(node.type));
  };

  getNodesBySomeType(type: NodeTypes) {
    return this.graphNodes.filter(node => node.type === type);
  }

  convertToRenderNode(type: NodeTypes) {

  }
}
