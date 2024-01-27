import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) idModal!: any;
  @Output() closeModal = new EventEmitter();

  handleCloseModal() {
    this.closeModal.emit()
  }
}
