import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { EmployeesService } from '../../services/employees-service';
import { TagsTodoService } from '../../services/tags-todo-service';
import { TaskService } from '../../services/task-service';
import { ButtonComponent } from '../button-component/button-component';
import { DialogComponent } from '../dialog-component/dialog-component';
import {
  CreateTodoFormData,
  FormCreateTodoComponent,
} from '../form-create-todo-component/form-create-todo-component';
import { DialogCreateTaskService } from '../../services/dialog-create-task-service';

@Component({
  selector: 'app-dialog-create-todo-component',
  imports: [DialogComponent, FormCreateTodoComponent, ButtonComponent],
  templateUrl: './dialog-create-todo-component.html',
  styleUrl: './dialog-create-todo-component.scss',
})
export class DialogCreateTodoComponent implements OnInit {
  private _employeesService = inject(EmployeesService);
  private _tagsTodoService = inject(TagsTodoService);
  private _dialogCreateTodoService = inject(DialogCreateTaskService);
  private _todosService = inject(TaskService);

  isOpen = computed(() => this._dialogCreateTodoService.isOpen());
  form = viewChild<FormCreateTodoComponent>('formAddTodo');

  employees = this._employeesService.employees.value;
  tags = this._tagsTodoService.tags.value;

  constructor() {}

  ngOnInit(): void {}

  onChangeDialog(value: boolean) {
    this._dialogCreateTodoService.isOpenChange(value);
  }

  formSubmit(formData: CreateTodoFormData) {
    this._todosService.createTask(formData).subscribe({
      next: () => {
        this._dialogCreateTodoService.close();
      },

      error: (error) => {
        console.error('Error creating todo: ', error);
      },
    });
  }

  onCreate() {
    this.form()?.onSubmit();
  }

  onCancel() {
    this._dialogCreateTodoService.close();
  }
}
