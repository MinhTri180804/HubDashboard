import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TodoService } from '../../services/todo-service';
import { TodoInfo } from '../../types/todo';

@Component({
  selector: 'app-todo-item-component',
  imports: [MatIcon, MatProgressBar, MatCheckbox],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.scss',
})
export class TodoItemComponent implements OnInit {
  todoService = inject(TodoService);
  todoData = input.required<TodoInfo>();
  hasSubTodo = computed(() => this.todoData()?.subTodos?.length > 0);

  ngOnInit(): void {
    console.log(this.todoData());
    console.log(this.todoData().subTodos);
  }

  completedSubTodo = computed(() =>
    this.todoData().subTodos.filter((todo) => todo.isDone)
  );

  progressSubTodo = computed(() => {
    const completed = this.completedSubTodo().length;
    const total = this.todoData().subTodos.length;
    return ((completed / total) * 100).toFixed(0);
  });

  isOpenSubTodo = signal<boolean>(false);
  constructor() {}

  handleToggle() {
    this.isOpenSubTodo.update((prev) => !prev);
  }

  handleToggleSubTodo(event: MatCheckboxChange) {
    // this.todoService.updateSubTodo(
    //   this.todoData().id,
    //   event.source.value,
    //   event.checked
    // );
    // console.log(this.todoData());
  }
}
