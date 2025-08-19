import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
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
export class TodoManagerComponent implements OnInit {
  taskService = inject(TaskService);

  constructor() {}

  ngOnInit(): void {
    this.taskService.fetchAllTasks().subscribe();
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
