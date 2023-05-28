import {Component, EventEmitter, Input, Output} from '@angular/core';
import {INewNodeModel, INode} from "../../../shared/interfaces";

@Component({
    selector: 'app-admin-sidebar-content',
    templateUrl: './admin-sidebar-content.component.html',
    styleUrls: ['./admin-sidebar-content.component.scss']
})
export class AdminSidebarContentComponent {
    @Input()
    public selectedNode: INode;

    @Output()
    public getGradeNodes = new EventEmitter<INode>();

    @Output()
    public saveNewNode = new EventEmitter<INewNodeModel>();

    @Output()
    public deleteNode = new EventEmitter<INode>();

    public isCreateNewNode = false;

    public newNodeModel: INewNodeModel = {
        type: 'main',
        name: ''
    };

    private _types = [{
        value: 'role',
        name: 'Роль'
    }, {
        value: 'grade',
        name: 'Грейд'
    }, {
        value: 'skill',
        name: 'Скилл'
    }, {
        value: 'position',
        name: 'Должность'
    }];

    getSkillsAndPositions() {
        this.getGradeNodes.emit(this.selectedNode);
    }

    saveNode() {
        if (this.newNodeModel.type !== 'main' && this.newNodeModel.name) {
            this.saveNewNode.emit(this.newNodeModel);
            this.isCreateNewNode = false;
            this.newNodeModel = {
                type: 'main',
                name: ''
            };
        }
    }

    delete() {
        if (this.selectedNode.type !== 'main') {
            this.deleteNode.emit(this.selectedNode);
        }
    }
}
