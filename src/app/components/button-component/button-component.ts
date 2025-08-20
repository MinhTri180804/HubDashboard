import {
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'outline';

export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button-component',
  imports: [MatIconModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent implements OnInit {
  buttonVariant = input<ButtonVariant>('primary');
  buttonSize = input<ButtonSize>('medium');
  icon = input<string>();
  iconPosition = input<'left' | 'right'>('left');
  isDisabled = input<boolean>(false);
  type = input<'submit' | 'button' | 'reset'>('button');

  clicked = output<MouseEvent>();

  ngOnInit(): void {}

  handleClick(event: MouseEvent) {
    if (!this.isDisabled()) {
      this.clicked.emit(event);
    }
  }

  get buttonClasses(): string {
    return [
      'button__common',
      `button__variant--${this.buttonVariant()}`,
      `button__size--${this.buttonSize()}`,
      `icon__position--${this.iconPosition()}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
