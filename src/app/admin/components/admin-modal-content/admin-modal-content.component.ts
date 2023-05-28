import {Component, EventEmitter, Input, Output} from '@angular/core';
import {INewNodeModel, INode} from "../../../shared/interfaces";

@Component({
    selector: 'app-admin-modal-content',
    templateUrl: './admin-modal-content.component.html',
    styleUrls: ['./admin-modal-content.component.scss']
})
export class AdminModalContentComponent {
    @Input()
    public selectedNode: INode;

    @Output()
    public saveDutyOrSubskill = new EventEmitter<INewNodeModel>();

}
