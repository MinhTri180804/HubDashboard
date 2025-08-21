import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import {
  Component,
  computed,
  DoCheck,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task-service';
import { TaskStateService } from '../../services/task-state-service';
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
export class CardTaskComponent implements OnInit, DoCheck {
  private _taskService = inject(TaskService);
  private _taskStateService = inject(TaskStateService);

  taskState = input.required<TaskStateInfo>();
  dropListDropped = output<CdkDragDrop<TaskInfo[], any, any>>();

  tasks = this._taskService.tasksData;
  isLoading = computed(() => this.tasks.isLoading());
  data = computed(() => {
    return this.tasks
      .value()
      ?.filter((task) => task.state._id === this.taskState()._id);
  });
  dropListConnectTo = computed(() => {
    return this._taskStateService
      .taskStateIds()
      .filter((item) => item !== this.taskState()._id);
  });

  constructor() {}

  ngOnInit(): void {}
  ngDoCheck(): void {}

  onDropListDropped(event: CdkDragDrop<TaskInfo[], any, any>) {
    this.dropListDropped.emit(event);
  }
}
