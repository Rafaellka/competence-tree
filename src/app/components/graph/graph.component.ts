import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EChartsOption} from "echarts";
import {LinksService} from 'src/app/services/links.service';
import {NodesService} from "../../services/nodes.service";
import {IFilters, IRenderNode, nodeStyles, NodeTypes, INode} from "../../../interfaces";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  visible: boolean;
  title: string;
  modal: boolean;
  options: EChartsOption;
  filters: IFilters;
  nodes$ = forkJoin([
    this.nodesService.getRoles(),
    this.nodesService.getGradeByRole(5),
    this.nodesService.getSkillsByGrade(10)
    ]
  );

  constructor(private nodesService: NodesService, private linkService: LinksService) {
  }

  ngOnInit() {
    this.visible = false;
    this.modal = false;
    this.title = '';
    this.filters = {
      skill: true,
      mySkill: true,
      myGrade: true,
      myRole: true,
      position: true,
      myPosition: true
    };
    this.nodes$.subscribe((result) => {
      result.forEach((value, index) => {
        this.nodesService.addNewNodes(value);

        switch (value[0].type) {
          case 'role':
            this.linkService.bindRolesWithMainNode();
            break;
          case 'grade':
            this.linkService.bindGradesByRole('role:5');
            break;
          case 'skill':
            this.linkService.bindSkillsWithGrade('grade:10')
        }

        this.options = {
          tooltip: {},
          animation: false,
          series: [
            {
              type: 'graph',
              roam: true,
              layout: 'force',
              force: {
                gravity: 0.05,
                layoutAnimation: false,
                repulsion: 60
              },
              zoom: 3,
              scaleLimit: {
                min: 1,
                max: 15
              },
              label: {
                show: true,
                fontSize: 14,
              },
              data: this.nodesService.getGraphNodes(),
              links: this.linkService.getLinks()
            }
          ]
        }
      })
    });
  }

  showNav() {
    this.visible = true;
  };

  filterNodes() {
    const filters = Object.entries(this.filters)
      .filter(pair => pair[1])
      .map(pair => pair[0]);
    const filtered = this.nodesService.getFilteredNodes(filters as NodeTypes[]);
    this.options = {
      tooltip: {},
      animation: false,
      series: [
        {
          type: 'graph',
          roam: true,
          layout: 'force',
          force: {
            gravity: 0.05,
            layoutAnimation: false,
            repulsion: 60
          },
          zoom: 3,
          scaleLimit: {
            min: 1,
            max: 15
          },
          label: {
            show: true,
            fontSize: 14,
          },
          data: filtered,
          links: this.linkService.getLinks()
        }
      ]
    };
  }

  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
    if (event['data']['NodeTypes'] === 'skill' || event['data']['NodeTypes'] === 'position'){
      this.modal = true;
    }
    this.title = event['data']['name'];
  };
}
