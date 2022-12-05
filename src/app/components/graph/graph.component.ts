import { Component } from '@angular/core';
import { EChartsOption } from "echarts";
import { LinksService } from 'src/app/services/links.service';
import { NodesService } from "../../services/nodes.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  constructor(private nodesService: NodesService, private linkService: LinksService) {
  }

  flag: boolean = false;

  showNav() {
    this.flag = !this.flag;
  };

  options: EChartsOption = {
    tooltip: {},
    animation: false,
    series: [
      {
        type: 'graph',
        roam: true,
        layout: 'force',
        zoom: 10,
        scaleLimit: {
          min: 5,
          max: 15
        },
        label: {
          show: true,
          fontSize: 14
        },
        data: this.nodesService.getGraphNodes(),
        links: this.linkService.getLinks()
      }
    ]
  };
}
