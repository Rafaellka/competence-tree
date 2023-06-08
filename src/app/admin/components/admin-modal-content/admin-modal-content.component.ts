import {Component, Input, OnChanges} from '@angular/core';
import {INode} from "../../../shared/interfaces";
import {NodeService} from "../../../shared/services/node.service";
import {AdminModalContentViewModel} from "../../view-models/admin-modal-content.view-model";
import {concatMap, of} from "rxjs";

@Component({
    selector: 'app-admin-modal-content',
    templateUrl: './admin-modal-content.component.html',
    styleUrls: ['./admin-modal-content.component.scss']
})
export class AdminModalContentComponent implements OnChanges {
    @Input()
    public selectedNode: INode;

    public model: AdminModalContentViewModel = new AdminModalContentViewModel();

    constructor(
        private _nodeService: NodeService
    ) {
    }

    public ngOnChanges(): void {
        const id: string = this.selectedNode.id.split(':')[1]
        if (this.selectedNode.type === 'position') {
            this._nodeService.getDutiesByPositionId(id)
                .subscribe((duties) => {
                    this.model.items = duties;
                })
        } else {
            this._nodeService.getSubskillBySkillId(id)
                .subscribe((skills) => {
                    this.model.items = skills;
                })
        }

    }

    public createDuty(title: string) {
        this._nodeService.createDuty(title)
            .pipe(
                concatMap((dutyId: number) =>
                    this._nodeService.createPositionDuty(+this.selectedNode.id.split(':')[1], dutyId)
                        .pipe(
                            concatMap(() => of(dutyId))
                        )
                ))
            .subscribe((dutyId) => {
                this.model.items.push({
                    title,
                    id: dutyId
                })
            });
    }

    public deleteDutyFromPosition(dutyId: string) {
        this._nodeService.deleteDutyFromPosition(this.selectedNode.id.split(':')[1], dutyId)
            .subscribe(() => {
                this.model.items = this.model.items.filter(item => item.id === +dutyId);
            });
    }
}
