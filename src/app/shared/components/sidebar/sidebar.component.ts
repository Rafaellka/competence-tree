import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Input()
    public visible: boolean;

    @Output()
    public visibleChange = new EventEmitter<boolean>();

    hideSidebar() {
        this.visibleChange.emit(false);
    }
}
