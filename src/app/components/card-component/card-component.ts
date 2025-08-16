import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  AfterContentInit,
  Component,
  contentChild,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [],
  templateUrl: './card-component.html',
  styleUrl: './card-component.scss',
})
export class CardComponent implements AfterContentInit {
  dropListId = input<string>('');

  hostElement = inject<ElementRef<HTMLDivElement>>(ElementRef);
  renderer2 = inject(Renderer2);

  ngAfterContentInit(): void {
    const headerElement = this.hostElement.nativeElement.querySelector(
      'header.card__header'
    );

    const headerTitle = headerElement?.querySelector('[card-header-title]');

    if (!headerTitle) {
      this.renderer2.removeChild(this.hostElement, headerElement, true);
    }
  }
}
