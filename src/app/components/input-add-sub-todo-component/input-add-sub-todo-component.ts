import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  ElementRef,
  forwardRef,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SubTodoInfo } from '../../types/subTodo';

export type SubTodoFormData = string;

@Component({
  selector: 'app-input-add-sub-todo-component',
  imports: [MatIcon],
  templateUrl: './input-add-sub-todo-component.html',
  styleUrl: './input-add-sub-todo-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAddSubTodoComponent),
      multi: true,
    },
  ],
})
export class InputAddSubTodoComponent implements ControlValueAccessor {
  private _onChange: (subTodos: SubTodoFormData[]) => void = () => {};
  private _onTouched: () => void = () => {};

  valueInput = signal<string>('');

  subTodos = signal<SubTodoFormData[]>([]);

  constructor() {}

  writeValue(objs: SubTodoFormData[]): void {
    this.subTodos.set(objs);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onSubmitAddSubTodo(event: SubmitEvent) {
    event.preventDefault();
    this._onTouched();

    this.subTodos.update((prev) => [...prev, this.valueInput()]);
    this.valueInput.set('');
    this._onChange(this.subTodos());
  }

  onChangeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueInput.set(input.value);
  }
}
