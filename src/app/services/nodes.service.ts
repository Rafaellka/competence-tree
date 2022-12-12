import { Injectable } from '@angular/core';
import { IRenderNode, ITypedNode } from "../../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  typedNodes: ITypedNode[] = [];
  data1: IRenderNode[] = [{
    name: 'Artsofte',
    id: 'Node 1',
    symbolSize: 26,
    itemStyle: {
      color: '#2E62D9'
    },
  }, {
    name: 'Frontend',
    id: 'Node 2',
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    },
  }, {
    name: 'Junior',
    id: 'Node 3',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    },
  }, ];

  data: IRenderNode[] = [{
    name: 'Artsofte',
    id: 'Node 1',
    symbolSize: 26,
    itemStyle: {
      color: '#2E62D9'
    },
  }, {
    name: 'Frontend',
    id: 'Node 2',
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    },
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
  },{
    name: 'Тестирование',
    id: 'Node 16',
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    }
  },{
    name: 'Junior',
    id: 'Node 17',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Middle',
    id: 'Node 18',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Senior',
    id: 'Node 19',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 20',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 21',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 22',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 23',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 24',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 25',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 26',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 27',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 28',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 29',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 30',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 31',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 32',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 33',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 34',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Младший тестировщик',
    id: 'Node 35',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Тестировщик',
    id: 'Node 36',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Тестировщик QA',
    id: 'Node 37',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Средний тестировщик',
    id: 'Node 38',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Тестировщик',
    id: 'Node 39',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Тестировщик QA',
    id: 'Node 40',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Старший тестировщик',
    id: 'Node 41',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Тестировщик',
    id: 'Node 42',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Тим лид',
    id: 'Node 43',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Junior',
    id: 'Node 44',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Middle',
    id: 'Node 45',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Senior',
    id: 'Node 46',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 47',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 48',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 49',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 50',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 51',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 52',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 53',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 54',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 55',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 56',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 57',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 58',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 59',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 60',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 61',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Младший разработчик',
    id: 'Node 62',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик',
    id: 'Node 63',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик сервисов',
    id: 'Node 64',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Средний разработчик',
    id: 'Node 65',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик',
    id: 'Node 66',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик сервисов',
    id: 'Node 67',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Старший разработчик',
    id: 'Node 68',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик',
    id: 'Node 69',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Тим лид',
    id: 'Node 70',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Devops',
    id: 'Node 71',
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    }
  }, {
    name: 'Junior',
    id: 'Node 72',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Middle',
    id: 'Node 73',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Senior',
    id: 'Node 74',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 75',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 76',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 77',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 78',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 79',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 80',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 81',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 82',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 83',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 84',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 85',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 86',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 87',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 88',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 89',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Младший Разработчик',
    id: 'Node 90',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик',
    id: 'Node 91',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик 2',
    id: 'Node 92',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Средний Разработчик',
    id: 'Node 93',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик',
    id: 'Node 94',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик 2',
    id: 'Node 95',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Старший Разработчик',
    id: 'Node 96',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик',
    id: 'Node 97',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Разработчик 2',
    id: 'Node 98',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Дизайнер',
    id: 'Node 99',
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    }
  }, {
    name: 'Junior',
    id: 'Node 100',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Middle',
    id: 'Node 101',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Senior',
    id: 'Node 102',
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 103',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 104',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 105',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 106',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 107',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 108',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 109',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 110',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 111',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 112',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 1',
    id: 'Node 113',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 2',
    id: 'Node 114',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 3',
    id: 'Node 115',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 4',
    id: 'Node 116',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Скилл 5',
    id: 'Node 117',
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  }, {
    name: 'Младший дизайнер',
    id: 'Node 118',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Дизайнер',
    id: 'Node 119',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Дизайнер страниц',
    id: 'Node 120',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Средний дизайнер',
    id: 'Node 121',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Дизайнер',
    id: 'Node 122',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Дизайнер страниц',
    id: 'Node 123',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Старший дизайнер',
    id: 'Node 124',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Дизайнер',
    id: 'Node 125',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }, {
    name: 'Дизайнер страниц',
    id: 'Node 126',
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  },];

  addNode() {
    this.data.push({
      name: 'Middle',
      id: 'Node 4',
      symbolSize: 15,
      itemStyle: {
        color: '#A1DE93'
      }
    });
  }
  getGraphNodes() {
    return new Observable<IRenderNode[]>((sub) => {
      sub.next(this.data);
    });
  }
}
