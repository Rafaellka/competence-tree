import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modal: boolean;
  @Input() title: string;
  @Output() modalChange = new EventEmitter<boolean>();

  hideModal() {
    this.modalChange.emit(false);
  }

  innerClick($event: Event) {
    $event?.stopPropagation();
  }

}
