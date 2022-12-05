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
}

export interface ITypedNode extends INode {
  type: string;
}