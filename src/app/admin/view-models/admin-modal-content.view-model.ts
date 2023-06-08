import {IHaveIdAndTitle, INode} from "../../shared/interfaces";

export class AdminModalContentViewModel {
    public items: IHaveIdAndTitle[];
    public selectedNode: INode;

}