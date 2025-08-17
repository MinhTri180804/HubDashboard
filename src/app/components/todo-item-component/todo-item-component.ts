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
import { TodoCreatedPipePipe } from '../../pipes/todo-created-pipe-pipe';

@Component({
  selector: 'app-todo-item-component',
  imports: [MatIcon, MatProgressBar, MatCheckbox, TodoCreatedPipePipe],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.scss',
})
export class TodoItemComponent implements OnInit {
  todoService = inject(TodoService);
  todoData = input.required<TodoInfo>();
  hasSubTodo = computed(() => this.todoData()?.subTodos?.length > 0);
  hasBugTag = computed(() => {
    const tags = this.todoData()?.tagIds || [];
    return tags.some((tag) => tag.name === 'Bug');
  });

  dateTime = computed(() => {
    return Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
    }).format(new Date(this.todoData().createdAt));
  });

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
    const subTodoId = event.source.value;
    const checked = event.source.checked;
    const todoId = this.todoData()._id;
    this.todoService.updateStateSubTodo(todoId, subTodoId, checked).subscribe();
  }

  handleDelete() {
    this.todoService.deleteTodo(this.todoData()._id).subscribe();
  }
}
