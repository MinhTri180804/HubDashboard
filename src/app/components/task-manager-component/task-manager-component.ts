import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { StateTodoEnum } from '../../enums/stateTodoEnum';
import { TaskService } from '../../services/task-service';
import { TaskInfo } from '../../types/task';
import { CardTaskComponent } from '../card-task-component/card-task-component';
import { TaskItemComponent } from '../task-item-component/task-item-component';
import {
  TaskStateConstants,
  TaskStateConstantsValues,
} from '../../constants/todoStateConstants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-manager-component',
  imports: [
    CardTaskComponent,
    MatIcon,
    TaskItemComponent,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './task-manager-component.html',
  styleUrl: './task-manager-component.scss',
})
export class TodoManagerComponent implements OnInit, OnDestroy {
  taskService = inject(TaskService);
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.taskService.fetchAllTasks().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleDrop(event: CdkDragDrop<TaskInfo[]>) {
    if (event.previousContainer === event.container) {
      // Reorder within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      setTimeout(() => {
        this.taskService

          .updateState({
            taskId: event.container.data[event.currentIndex]._id,
            state: this.getStateFromContainerId(event.container.id),
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      }, 0);

      // Move between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getStateFromContainerId(
    containerId: string
  ): TaskStateConstantsValues {
    switch (containerId) {
      case 'todo-pending':
        return TaskStateConstants.TODO;
      case 'todo-in-process':
        return TaskStateConstants.IN_PROGRESS;
      case 'todo-done':
        return TaskStateConstants.COMPLETED;
      default:
        throw new Error(`Unknown container ID: ${containerId}`);
    }
  }
}
