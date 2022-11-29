import { Component, OnInit, DoCheck } from '@angular/core';
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  options: EChartsOption = {
    tooltip: {},

    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [ 
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: false,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data: [
          {
            id: '1',
            name: 'Artsofte',
            x: 500,
            y: 300, 
            label :{
              color: 'white',
            },
            select: {
              itemStyle: {
                color: 'green'
              }
            },
            symbolSize: 100,
            itemStyle: {
              color: '#2E62D9',
              
            }
          },
          {
            id: '2',
            name: 'Грейд 1',
            x: 300,
            y: 300,
            itemStyle: {
              color: '#A1DE93'
            }
          },
          {
            id: '3',
            name: 'Грейд 2',
            x: 200,
            y: 280,
            itemStyle: {
              color: '#F7F48B'
            }
          },
          {
            id: '4',
            name: 'Должность 1',
            x: 300, 
            y: 200,
            itemStyle: {
              color: '#A1DE93'
            }
          },
          {
            id: '5',
            name: 'Должность 2',
            x: 180, 
            y: 350,
            label :{
              // color: 'white'
            },
            itemStyle: {
              color: '#70A1D7'
            }
          },
          {
            id: '6',
            name: 'Скилл 1',
            x: 350, 
            y: 400,
            itemStyle: {
              color: '#F47C7C'
              
            }
          },
          {
            id: '7',
            name: 'Скилл 2',
            x: 150, 
            y: 200,
            itemStyle: {
              color: '#F47C7C'
            }
          },
          {
            id: '8',
            name: 'Грейд 1',
            x: 590, 
            y: 340,
            itemStyle: {
              color: '#F7F48B'
            }
          },
          {
            id: '9',
            name: 'Грейд 2',
            x: 700, 
            y: 400,
            itemStyle: {
              color: '#F7F48B'
            }
          },
          {
            id: '10',
            name: 'Скилл 1',
            x: 580, 
            y: 400,
            itemStyle: {
              color: '#F47C7C'
              
            }
          },
          {
            id: '11',
            name: 'Скилл 2',
            x: 720, 
            y: 360,
            itemStyle: {
              color: '#F47C7C'
            }
          },
          {
            id: '12',
            name: 'Должность 1',
            x: 560, 
            y: 280,
            itemStyle: {
              color: '#70A1D7'
            }
          },
          {
            id: '13',
            name: 'Скилл 3',
            x: 760, 
            y: 460,
            itemStyle: {
              color: '#F47C7C'
            }
          },
          {
            id: '14',
            name: 'Скилл 2',
            x: 800, 
            y: 400,
            itemStyle: {
              color: '#F47C7C'
            }
          },
          {
            id: '15',
            name: 'Должность 2',
            x: 770, 
            y: 310,
            itemStyle: {
              color: '#70A1D7'
            }
          },
        ],
        links: [
          {
            source: '1',
            target: '2',
            lineStyle: {
              curveness: 0.2
            },
            label: {
              show: true,
              formatter: () => {
                return 'Frontend'
              }
            }
          },
          {
            source: '3',
            target: '7'
            },
            {
            source: '2',
            target: '4'
          },
          {
            source: '2',
            target: '3'
          },
          {
            source: '2',
            target: '6'
          },
          {
            source: '3',
            target: '5'
          },
          {
            source: '1',
            target: '8',
            lineStyle: {
              curveness: -0.2
            },
            label: {
              show: true,
              formatter: () => {
                return 'Backend'
              }
            }
          },
          {
            source: '8',
            target: '9'
          },
          {
            source: '8',
            target: '10'
          },
          {
            source: '9',
            target: '11'
          },
          {
            source: '8',
            target: '12'
          },
          {
            source: '9',
            target: '13'
          },
          {
            source: '9',
            target: '14'
          },
          {
            source: '9',
            target: '15',
            lineStyle: {
              curveness: -0.4
            }
          }
        ],
        tooltip: {
          trigger: 'none',
        }
      }
    ]
  };
  constructor() { }

  ngOnInit(): void {
  }

  onClick(e: MouseEvent) {
    console.log(e.offsetX)
    console.log(e.offsetY)
  }

}
