import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dropdown-item-component',
  imports: [],
  templateUrl: './dropdown-item-component.html',
  styleUrl: './dropdown-item-component.scss',
})
export class DropdownItemComponent {
  clicked = output();
  isDisabled = input(false);

  handleClick() {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
  }
}
