import {
  AfterContentInit,
  Component,
  contentChild,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dropdown-component',
  imports: [MatIcon],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.scss',
})
export class DropdownComponent implements AfterContentInit {
  private readonly _CLASS_OPEN = 'open';
  private renderer2 = inject(Renderer2);
  private hostElement = inject<ElementRef<HTMLDivElement>>(ElementRef);
  protected hasChild = signal(false);
  private optionsChild = contentChild('options', { read: ElementRef });
  isOpen = signal<boolean>(false);

  ngAfterContentInit(): void {
    if (this.optionsChild()?.nativeElement) {
      this.renderer2.setStyle(
        this.hostElement.nativeElement,
        'cursor',
        'pointer'
      );
      this.hasChild.set(true);
    }
  }

  toggleOpen() {
    if (this.hasChild() && this.optionsChild()?.nativeElement) {
      this.isOpen.update((prev) => !prev);
      if (this.isOpen()) {
        this.show();
      } else {
        this.close();
      }
    }
  }

  show() {
    this.renderer2.addClass(
      this.optionsChild()!.nativeElement,
      this._CLASS_OPEN
    );
  }

  close() {
    this.renderer2.removeClass(
      this.optionsChild()!.nativeElement,
      this._CLASS_OPEN
    );
  }
}
