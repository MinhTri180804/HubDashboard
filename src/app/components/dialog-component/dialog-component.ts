import {
  Component,
  ElementRef,
  inject,
  input,
  model,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-component',
  imports: [MatIcon],
  templateUrl: './dialog-component.html',
  styleUrl: './dialog-component.scss',
})
export class DialogComponent {
  private providerElement = viewChild('provider', {
    read: ElementRef,
  });
  private renderer2 = inject(Renderer2);

  isOpen = model<boolean>(false);

  onCloseDialog() {
    this.renderer2.removeClass(this.providerElement()?.nativeElement, 'open');
    this.isOpen.set(false);
  }
}
