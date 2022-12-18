export type NodeTypes =  'main' | 'role' | 'grade' | 'skill' | 'position';

export interface ILink {
  source: string;
  target: string;
}

export const nodeStyles = {
  'main': {
    symbolSize: 26,
    itemStyle: {
      color: '#2E62D9'
    }
  },
  'role': {
    symbolSize: 20,
    itemStyle: {
      color: '#2E62D9'
    }
  },
  'grade': {
    symbolSize: 15,
    itemStyle: {
      color: '#F7F48B'
    }
  },
  'skill': {
    symbolSize: 10,
    itemStyle: {
      color: '#F47C7C'
    }
  },
  'position': {
    symbolSize: 10,
    itemStyle: {
      color: '#70A1D7'
    }
  }
};

export interface IFilters {
  skill: boolean;
  mySkill: boolean;
  position: boolean;
  myPosition: boolean;
  myGrade: boolean;
  myRole: boolean;
}

export interface IRequest {
  items: {id: number, title: string}[],
  pagination: {
    offset: number,
    count: number,
    totalCount: number
  }
}

export interface IStandartResponse {
  id: number;
  title: string;
}

export interface INode {
  name: string;
  id: string;
  type: NodeTypes;
}

export interface IRenderNode extends INode {
  symbolSize: number;
  itemStyle: {
    color: string;
  }
}

export interface ISkill extends IRenderNode {
  gradeId: string;
}
