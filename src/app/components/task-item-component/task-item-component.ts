import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TaskService } from '../../services/task-service';
import { TaskInfo } from '../../types/task';
import { TodoCreatedPipePipe } from '../../pipes/todo-created-pipe-pipe';
import { PercentColor } from '../../directives/percent-color';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-item-component',
  imports: [
    MatIcon,
    MatProgressBar,
    MatCheckbox,
    TodoCreatedPipePipe,
    PercentColor,
  ],
  templateUrl: './task-item-component.html',
  styleUrl: './task-item-component.scss',
})
export class TaskItemComponent implements OnInit {
  private _taskService = inject(TaskService);

  taskData = input.required<TaskInfo>();
  hasSubTask = computed(() => this.taskData()?.subTodos?.length > 0);
  hasBugTag = computed(() => {
    const tags = this.taskData()?.tagIds || [];
    return tags.some((tag) => tag.name === 'Bug');
  });

  ngOnInit(): void {
    console.log(this.taskData());
  }

  completedSubTodo = computed(() =>
    this.taskData().subTodos.filter((todo) => todo.isDone)
  );

  progressSubTodo = computed(() => {
    const completed = this.completedSubTodo().length;
    const total = this.taskData().subTodos.length;
    return Math.floor((completed / total) * 100);
  });

  isOpenSubTodo = signal<boolean>(false);

  constructor() {}

  handleToggle() {
    this.isOpenSubTodo.update((prev) => !prev);
  }

  handleToggleSubTask(event: MatCheckboxChange) {
    const subTodoId = event.source.value;
    const checked = event.source.checked;
    const todoId = this.taskData()._id;
    this._taskService
      .updateStateSubTodo(todoId, subTodoId, checked)
      .subscribe();
  }

  handleDelete() {
    this._taskService.deleteTask(this.taskData()._id);
  }
}
