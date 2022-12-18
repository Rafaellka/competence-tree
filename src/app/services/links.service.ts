import {Injectable} from '@angular/core';
import {ILink, IRenderNode, ISkill} from 'src/interfaces';
import {HttpClient} from "@angular/common/http";
import {NodesService} from "./nodes.service";

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  links: ILink[] = [];

  constructor(private http: HttpClient, private nodeService: NodesService) {
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
    let prev: IRenderNode;
    const grades = this.nodeService.getNodesBySomeType('grade');
    const links: ILink[] = grades.map((current) => {
      const link = {
        source: '',
        target: current.id
      };

      if (prev) {
        link.source = prev.id;
      } else {
        link.source = roleId;
      }

      prev = current;
      return link;
    });
    this.addLinks(links);
  }

  bindSkillsWithGrade(gradeId: string) {
    let prev: IRenderNode;
    const skills = this.nodeService.getGraphNodes()
      .filter(node => node.type === 'skill')
      .map(skill => skill as ISkill)
      .filter(skill => skill.gradeId === gradeId);
    const links: ILink[] = skills.map((skill, index) => ({
      source: gradeId,
      target: skill.id
    }));
    this.addLinks(links);
  }

  addLinks(newLinks: ILink[]) {
    this.links = [...this.links, ...newLinks]
  }

  getLinks() {
    return this.links;
  }
}
