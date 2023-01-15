import {Component, EventEmitter, Input, Output} from '@angular/core';
import {INewNodeModel, INode} from "../../../interfaces";

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
    @Input() selectedNode: INode;
    @Output() getGradeNodes = new EventEmitter<INode>();
    @Output() saveNewNode = new EventEmitter<INewNodeModel>();
    @Output() deleteNode = new EventEmitter<INode>();

    isCreateNewNode = false;

    newNodeModel: INewNodeModel = {
        type: 'main',
        name: ''
    };
    types = [{
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

    constructor() {
    }

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
