import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task-service';
import { TaskStateService } from '../../services/task-state-service';
import { TaskInfo } from '../../types/task';
import { CardTaskComponent } from '../card-task-component/card-task-component';

@Component({
  selector: 'app-task-manager-component',
  imports: [CardTaskComponent],
  templateUrl: './task-manager-component.html',
  styleUrl: './task-manager-component.scss',
})
export class TodoManagerComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  private destroy$ = new Subject<void>();
  private _taskService = inject(TaskService);
  private _taskStateService = inject(TaskStateService);

  isLoading = this._taskStateService.taskState.isLoading;
  taskStateData = this._taskStateService.taskState.value;

  constructor() {}

  ngOnInit(): void {}

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
        this._taskService

          .updateState({
            taskId: event.container.data[event.currentIndex]._id,
            state: event.container.id,
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

  ngAfterViewChecked(): void {}
}
