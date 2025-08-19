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
import { TaskService } from '../../services/task-service';
import { TaskInfo } from '../../types/task';
import { TodoCreatedPipePipe } from '../../pipes/todo-created-pipe-pipe';
import { PercentColor } from '../../directives/percent-color';

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
  taskService = inject(TaskService);
  taskData = input.required<TaskInfo>();
  hasSubTask = computed(() => this.taskData()?.subTasks?.length > 0);
  hasBugTag = computed(() => {
    const tags = this.taskData()?.tagIds || [];
    return tags.some((tag) => tag.name === 'Bug');
  });

  dateTime = computed(() => {
    return Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
    }).format(new Date(this.taskData().createdAt));
  });

  ngOnInit(): void {}

  completedSubTodo = computed(() =>
    this.taskData().subTasks.filter((todo) => todo.isDone)
  );

  progressSubTodo = computed(() => {
    const completed = this.completedSubTodo().length;
    const total = this.taskData().subTasks.length;
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
    this.taskService.updateStateSubTodo(todoId, subTodoId, checked).subscribe();
  }

  handleDelete() {
    this.taskService.deleteTask(this.taskData()._id).subscribe();
  }
}
