import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  hideSidebar() {
    this.visibleChange.emit(false);
  }
}
