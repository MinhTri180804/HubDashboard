import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, computed, inject, input, output } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task-service';
import { TaskStateService } from '../../services/task-state-service';
import { ResponseSuccess } from '../../types/commons/commons';
import { TaskInfo } from '../../types/task';
import { TaskStateInfo } from '../../types/taskState';
import { CardComponent } from '../card-component/card-component';
import { TaskItemComponent } from '../task-item-component/task-item-component';

@Component({
  selector: 'app-card-task-component',
  imports: [
    CardComponent,
    MatIconModule,
    CdkDrag,
    CdkDropList,
    TaskItemComponent,
  ],
  templateUrl: './card-task-component.html',
  styleUrl: './card-task-component.scss',
})
export class CardTaskComponent {
  private _taskService = inject(TaskService);
  private _taskStateService = inject(TaskStateService);

  dropListDropped = output<CdkDragDrop<TaskInfo[], any, any>>();

  taskState = input.required<TaskStateInfo>();
  tasks = rxResource<ResponseSuccess<TaskInfo[]>, { stateId: string }>({
    params: () => ({ stateId: this.taskState()._id }),
    stream: ({ params }) => this._taskService.getTasksByStateId(params),
    defaultValue: [],
  });
  isLoading = this.tasks.isLoading;
  data = this.tasks.value;
  dropListConnectTo = computed(() => {
    return this._taskStateService
      .taskStateIds()
      .filter((item) => item !== this.taskState()._id);
  });

  constructor() {}

  onDropListDropped(event: CdkDragDrop<TaskInfo[], any, any>) {
    this.dropListDropped.emit(event);
  }
}
