import { Component, input, model, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-component',
  imports: [MatIcon],
  templateUrl: './dialog-component.html',
  styleUrl: './dialog-component.scss',
})
export class DialogComponent {
  isOpen = model<boolean>(false);

  onCloseDialog() {
    this.isOpen.set(false);
  }
}
