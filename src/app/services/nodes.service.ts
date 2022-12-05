import { Injectable } from '@angular/core';
import { IRenderNode, ITypedNode } from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  typedNodes: ITypedNode[] = [];

  data: IRenderNode[] = [{
    name: 'Artsofte',
    id: 'Node 1',
    symbolSize: 26,
    itemStyle: {
      color: '#2E62D9'
    }
  }, {
    name: 'Frontend',
    id: 'Node 2',
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    }
  }, {
    name: 'Junior',
    id: 'Node 3',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Middle',
    id: 'Node 4',
    symbolSize: 15,
    itemStyle: {
      color: '#A1DE93'
    }
  }, {
    name: 'Senior',
    id: 'Node 5',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Backend',
    id: 'Node 6',
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    }
  }, {
    name: 'Младший разработчик',
    id: 'Node 7',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Старший разработчик',
    id: 'Node 8',
    symbolSize: 10,
    itemStyle: {
      color: '#A1DE93'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 9',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 10',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Тим лид',
    id: 'Node 11',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 12',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 13',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 14',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 6',
    id: 'Node 15',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  },];

  getGraphNodes() {
    return this.data;
  }
}
