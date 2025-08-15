import {
  AfterContentInit,
  Component,
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
  private renderer2 = inject(Renderer2);
  private hostElement = inject<ElementRef<HTMLDivElement>>(ElementRef);
  protected hasChild = signal(false);
  isOpen = signal(false);

  ngAfterContentInit(): void {
    const dropdownOptions = this.hostElement.nativeElement.querySelector(
      '.options__wrapper > [options]'
    );

    if (dropdownOptions) {
      this.renderer2.setStyle(
        this.hostElement.nativeElement,
        'cursor',
        'pointer'
      );
      this.hasChild.set(true);
    } else {
      this.renderer2.removeChild(
        this.hostElement,
        this.hostElement.nativeElement.querySelector('.options__wrapper')
      );
    }
  }

  toggleOpen() {
    if (this.hasChild()) {
      this.isOpen.update((previous) => !previous);
    }
  }
}
