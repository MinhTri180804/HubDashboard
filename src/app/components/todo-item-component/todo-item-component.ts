import { AfterViewInit, Component, signal } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-todo-item-component',
  imports: [MatIcon, MatProgressBar, MatCheckbox],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.scss',
})
export class TodoItemComponent implements AfterViewInit {
  isOpenSubTodo = signal<boolean>(false);
  constructor() {}

  handleToggle() {
    this.isOpenSubTodo.update((prev) => !prev);
  }

  ngAfterViewInit(): void {}
}
