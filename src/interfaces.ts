export type NodeTypes = 'main' | 'role' | 'grade' | 'skill' | 'position';

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

export const userNodeStyles = {
    symbolSize: 12,
    itemStyle: {
        color: '#A1DE93'
    }
}
export interface IResponse<T> {
    items: T[],
    pagination: {
        offset: number,
        count: number,
        totalCount: number
    }
}

export interface IStandardItem {
    id: number;
    title: string;
}

export interface ILink {
    source: string;
    target: string;
}

export interface IFilters {
    skill: boolean;
    mySkill: boolean;
    position: boolean;
    myPosition: boolean;
    myGrade: boolean;
    myRole: boolean;
}

export interface INode {
    name: string;
    id: string;
    type: NodeTypes;
    isParentNode?: boolean;
    parentId: string | null;
}

export interface IRenderNode extends INode {
    symbolSize: number;
    itemStyle: {
        color: string;
    };
    x?: number;
    y?: number;
}

export interface IUser {
    firstName: string;
    lastName: string;
    patronymic: string;
    id: string;
}

export interface IUserInfo extends IUser {
    name: string;
    isAdmin: boolean;
}

export interface IProject {
    name: string;
    position: string;
    role: string;
    grade: string;
}

export interface INodeInfo {
    parentId: string;
    parentName: string;
    type: NodeTypes;
    details: IDuty[] | ISkill[];
}

export interface IDuty {
    name: string;
    description?: string;
}

export interface ISkill {
    id: string;
    name: string;
}

export interface INewNodeModel {
    type: NodeTypes;
    name: string;
}