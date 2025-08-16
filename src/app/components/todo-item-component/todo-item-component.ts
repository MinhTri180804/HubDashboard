import {
  AfterViewInit,
  Component,
  input,
  computed,
  signal,
  AfterViewChecked,
} from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TodoInfo } from '../../types/todo';
import { inject } from '@angular/core';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo-item-component',
  imports: [MatIcon, MatProgressBar, MatCheckbox],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.scss',
})
export class TodoItemComponent {
  todoService = inject(TodoService);
  todoData = input.required<TodoInfo>();
  hasSubTodo = computed(() => this.todoData()?.subTodo?.length > 0);

  completedSubTodo = computed(() =>
    this.todoData().subTodo.filter((todo) => todo.isDone)
  );

  progressSubTodo = computed(() => {
    const completed = this.completedSubTodo().length;
    const total = this.todoData().subTodo.length;
    return ((completed / total) * 100).toFixed(0);
  });

  isOpenSubTodo = signal<boolean>(false);
  constructor() {}

  handleToggle() {
    this.isOpenSubTodo.update((prev) => !prev);
  }

  handleToggleSubTodo(event: MatCheckboxChange) {
    this.todoService.updateSubTodo(
      this.todoData().id,
      event.source.value,
      event.checked
    );

    console.log(this.todoData());
  }
}
