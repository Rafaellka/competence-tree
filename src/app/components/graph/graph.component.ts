import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { EChartsOption } from "echarts";
import { LinksService } from 'src/app/services/links.service';
import { NodesService } from "../../services/nodes.service";
import {IRenderNode} from "../../../interfaces";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit{
  data: IRenderNode[];
  visible: boolean;
  options: EChartsOption;

  constructor(private nodesService: NodesService, private linkService: LinksService) {
  }

  ngOnInit() {
    this.visible = false;

    this.nodesService.getGraphNodes().subscribe((data) => {
      this.data = data;
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
            data: this.data,
            links: this.linkService.getLinks()
          }
        ]
      };
    });
  }

  add() {
    this.nodesService.addNode();
    this.options = {
      tooltip: {},
      animation: false,
      series: [
        {
          type: 'graph',
          roam: true,
          layout: 'force',
          force: {
            gravity: 0.006,
            layoutAnimation: false,
            repulsion: 1000
          },
          zoom: 3,
          scaleLimit: {
            min: 2,
            max: 15
          },
          label: {
            show: true,
            fontSize: 14,
          },
          data: this.data,
          links: this.linkService.getLinks()
        }
      ]
    };
    console.log(this.data);
    console.log(this.options);
  }

  showNav() {
    this.visible = true;
  };

  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
  };
}
