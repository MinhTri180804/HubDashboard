import { Component, computed, effect, OnInit, viewChild } from '@angular/core';
import { EmployeesService } from '../../services/employees-service';
import { TagsTodoService } from '../../services/tags-todo-service';
import { TodoService } from '../../services/todo-service';
import { ButtonComponent } from '../button-component/button-component';
import { DialogComponent } from '../dialog-component/dialog-component';
import {
  CreateTodoFormData,
  FormCreateTodoComponent,
} from '../form-create-todo-component/form-create-todo-component';
import { DialogCreateTodoService } from './../../services/dialog-create-todo-service';

@Component({
  selector: 'app-dialog-create-todo-component',
  imports: [DialogComponent, FormCreateTodoComponent, ButtonComponent],
  templateUrl: './dialog-create-todo-component.html',
  styleUrl: './dialog-create-todo-component.scss',
})
export class DialogCreateTodoComponent implements OnInit {
  isOpen = computed(() => this._dialogCreateTodoService.isOpen());
  form = viewChild<FormCreateTodoComponent>('formAddTodo');

  constructor(
    private _dialogCreateTodoService: DialogCreateTodoService,
    private _employeesService: EmployeesService,
    private _tagsTodoService: TagsTodoService,
    private _todosService: TodoService
  ) {
    effect(() => {
      if (this.isOpen()) {
        this._employeesService.fetchAllEmployees().subscribe();
        this._tagsTodoService.fetchAllTags().subscribe();
      }
    });
  }

  ngOnInit(): void {}

  onChangeDialog(value: boolean) {
    this._dialogCreateTodoService.isOpenChange(value);
  }

  formSubmit(formData: CreateTodoFormData) {
    this._todosService.createTodo(formData).subscribe({
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
