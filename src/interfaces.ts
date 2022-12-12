export interface ILink {
  source: string;
  target: string;
}

export interface INode {
  name: string;
  id: string;
}

export interface IRenderNode extends INode {
  symbolSize: number;
  itemStyle: {
    color: string;
  }
  x?: number;
  y?: number;
}

export interface ITypedNode extends INode {
  type: string;
}
