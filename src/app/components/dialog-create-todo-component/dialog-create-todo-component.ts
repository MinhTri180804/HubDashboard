import { DialogCreateTodoService } from './../../services/dialog-create-todo-service';
import { Component, computed, OnInit, viewChild } from '@angular/core';
import { DialogComponent } from '../dialog-component/dialog-component';
import { FormCreateTodoComponent } from '../form-create-todo-component/form-create-todo-component';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'app-dialog-create-todo-component',
  imports: [DialogComponent, FormCreateTodoComponent, ButtonComponent],
  templateUrl: './dialog-create-todo-component.html',
  styleUrl: './dialog-create-todo-component.scss',
})
export class DialogCreateTodoComponent implements OnInit {
  isOpen = computed(() => this._dialogCreateTodoService.isOpen());
  form = viewChild<FormCreateTodoComponent>('formAddTodo');

  constructor(private _dialogCreateTodoService: DialogCreateTodoService) {}

  ngOnInit(): void {}

  onChangeDialog(value: boolean) {
    this._dialogCreateTodoService.isOpenChange(value);
  }

  formSubmit() {
    console.log('Form submitted');
  }

  onCreate() {
    this.form()?.onSubmit();
  }

  onCancel() {
    this._dialogCreateTodoService.close();
  }
}
