import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  hideSidebar() {
    this.visibleChange.emit(false);
  }
}
