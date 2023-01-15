import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IFilters, NodeTypes} from "../../../interfaces";
import {NodesService} from "../../services/nodes.service";
import {LinksService} from "../../services/links.service";

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './user-sidebar.component.html',
    styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent {
    filters: IFilters = {
        skill: true,
        mySkill: true,
        myGrade: true,
        myRole: true,
        position: true,
        myPosition: true
    };

    @Output() getFilters = new EventEmitter<IFilters>();

    filterNodes() {
        this.getFilters.emit(this.filters);
    }
}
