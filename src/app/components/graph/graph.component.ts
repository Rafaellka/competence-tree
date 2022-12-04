import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements AfterViewInit{
  @ViewChild('#nodeTemplate')
  circle: TemplateRef<any>;
  links: Edge[] = [
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: 'is parent of'
    }, {
      id: 'b',
      source: 'first',
      target: 'c1',
      label: 'custom label'
    }, {
      id: 'd',
      source: 'first',
      target: 'c2',
      label: 'custom label'
    }, {
      id: 'e',
      source: 'c1',
      target: 'd',
      label: 'first link'
    }, {
      id: 'f',
      source: 'c1',
      target: 'd',
      label: 'second link'
    }
  ];
  nodes: Node[] = [
    {
      id: 'first',
      label: 'A',
      data: {
        color: '#FFFFFF'
      }
    }, {
      id: 'second',
      label: 'B'
    }, {
      id: 'c1',
      label: 'C1'
    }, {
      id: 'c2',
      label: 'C2'
    }, {
      id: 'd',
      label: 'D'
    }
  ];

  ngAfterViewInit() {
    console.log(this.circle)
  }
}
