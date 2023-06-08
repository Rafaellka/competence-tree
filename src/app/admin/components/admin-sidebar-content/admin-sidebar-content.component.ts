import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FiniteTypes, INewNodeModel, INode, NodeTypes} from "../../../shared/interfaces";

@Component({
    selector: 'app-admin-sidebar-content',
    templateUrl: './admin-sidebar-content.component.html',
    styleUrls: ['./admin-sidebar-content.component.scss']
})
export class AdminSidebarContentComponent implements OnChanges {
    @Input()
    public selectedNode: INode;

    @Input()
    public isSidebarOpen: boolean = false;

    @Output()
    public getGradeNodes: EventEmitter<INode> = new EventEmitter<INode>();

    @Output()
    public saveNewNode: EventEmitter<INewNodeModel> = new EventEmitter<INewNodeModel>();

    @Output()
    public deleteNode: EventEmitter<INode> = new EventEmitter<INode>();

    @Output()
    public goToModal: EventEmitter<INode> = new EventEmitter<INode>();

    public isCreateNewNode = false;

    public newNodeModel: INewNodeModel = {
        type: 'main',
        name: ''
    };

    public isFiniteTypeNode: boolean = false;

    public ngOnChanges(changes: any): void {
        const type: NodeTypes = changes?.selectedNode?.currentValue?.type;
        const isSidebarOpen: boolean = changes?.isSidebarOpen?.currentValue;
        if (type) {
            this.isFiniteTypeNode = FiniteTypes.includes(changes.selectedNode.currentValue.type);
        }
        if (!isSidebarOpen) {
            this.isCreateNewNode = false;
        }
    }

    public showNotNodes() {
        this.goToModal.emit();
    }

    public getSkillsAndPositions(): void {
        this.getGradeNodes.emit(this.selectedNode);
    }

    public saveNode(): void {
        if (this.newNodeModel.type !== 'main' && this.newNodeModel.name) {
            this.saveNewNode.emit(this.newNodeModel);
            this.isCreateNewNode = false;
            this.newNodeModel = {
                type: 'main',
                name: ''
            };
        }
    }

    public delete(): void {
        if (this.selectedNode.type !== 'main') {
            this.deleteNode.emit(this.selectedNode);
        }
    }
}
