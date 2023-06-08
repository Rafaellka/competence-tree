import {Injectable} from '@angular/core';
import {ILink, INode, IRenderNode, NodeTypes} from 'src/app/shared/interfaces';
import {HttpClient} from "@angular/common/http";
import {NodeService} from "./node.service";

@Injectable({
    providedIn: 'root'
})
export class LinksService {
    private links: ILink[] = [];

    constructor(private http: HttpClient, private nodeService: NodeService) {
    }

    bindRolesWithMainNode() {
        const roles = this.nodeService.getNodesBySomeType('role');
        const newLinks: ILink[] = roles.map(role => ({
            source: 'MainNode',
            target: role.id
        }));

        this.addLinks(newLinks);
    }

    bindGradesByRole(roleId: string) {
        let prev: INode;
        const id = 'role:' + roleId;
        const grades = this.nodeService.getNodesBySomeType('grade')
            .map(grade => grade as INode)
            .filter(grade => grade.parentId === id);
        const links: ILink[] = grades.map((current) => {
            const link = {
                source: '',
                target: current.id
            };

            if (prev) {
                link.source = prev.id;
            } else {
                link.source = id;
            }

            prev = current;
            return link;
        });
        this.addLinks(links);
    }

    bindSkillsWithGrade(gradeId: number) {
        this.bindEntityWithGrade(gradeId, 'skill');
    }

    bindPositionsWithGrade(gradeId: number) {
        this.bindEntityWithGrade(gradeId, 'position');
    }

    bindEntityWithGrade(gradeId: number, type: NodeTypes) {
        const id = 'grade:' + gradeId;
        const entities = this.nodeService.getGraphNodes()
            .filter(node => node.type === type)
            .map(entity => entity as INode)
            .filter(entity => entity.parentId === id);
        const links: ILink[] = entities.map((entity) => ({
            source: 'grade:' + gradeId,
            target: entity.id
        }));
        this.addLinks(links);
    }

    bindNewNodeWithParent(parentId: string | null, newNode: IRenderNode) {
        if (!parentId) {
            parentId = 'MainNode'
        }
        this.addLinks([{
            source: parentId,
            target: newNode.id
        }])
    }

    addLinks(newLinks: ILink[]) {
        this.links = [...this.links, ...newLinks]
    }

    getLinks() {
        return this.links;
    }
}
