import { Component, computed, DoCheck, inject, viewChild } from '@angular/core';
import { DialogComponent } from '../dialog-component/dialog-component';
import { FormCreateTodoComponent } from '../form-create-todo-component/form-create-todo-component';
import { ButtonComponent } from '../button-component/button-component';
import { DialogCreateTaskState } from '../../services/dialog-create-task-state';
import {
  CreateTaskStateFormData,
  FormCreateTaskStateComponent,
} from '../form-create-task-state-component/form-create-task-state-component';
import { TaskStateService } from '../../services/task-state-service';

@Component({
  selector: 'app-dialog-create-task-state-component',
  imports: [DialogComponent, ButtonComponent, FormCreateTaskStateComponent],
  templateUrl: './dialog-create-task-state-component.html',
  styleUrl: './dialog-create-task-state-component.scss',
})
export class DialogCreateTaskStateComponent implements DoCheck {
  private _dialogCreateTaskStateService = inject(DialogCreateTaskState);
  private _taskStateService = inject(TaskStateService);
  private _createTaskStateForm = viewChild(FormCreateTaskStateComponent);

  isOpen = computed(() => this._dialogCreateTaskStateService.isOpen());

  constructor() {}

  ngDoCheck(): void {
    console.log(this.isOpen());
  }

  onChangeDialog(value: boolean) {
    this._dialogCreateTaskStateService.isOpenChange(value);
  }

  onCancel() {
    this._dialogCreateTaskStateService.close();
  }

  onCreateAction() {
    this._createTaskStateForm()?.onSubmit();
  }

  formSubmit(formData: CreateTaskStateFormData) {
    const countTaskState = this._taskStateService.taskStateIds().length;
    this._taskStateService
      .create({
        ...formData,
        order: countTaskState,
      })
      .subscribe({
        error: (error) => {
          console.error('Error create task state: ', error);
        },

        complete: () => {
          this._dialogCreateTaskStateService.close();
        },
      });
  }
}
