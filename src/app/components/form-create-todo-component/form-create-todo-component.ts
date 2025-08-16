import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface CreateTodoForm {
  title: FormControl<string>;
  status: FormControl<string>;
  tags: FormControl<string[]>;
}

@Component({
  selector: 'app-form-create-todo-component',
  imports: [ReactiveFormsModule],
  templateUrl: './form-create-todo-component.html',
  styleUrl: './form-create-todo-component.scss',
})
export class FormCreateTodoComponent {
  onCreateTodo = output();
  addTodoForm = new FormGroup<CreateTodoForm>({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    tags: new FormControl([], {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  statusMockData = [
    {
      name: 'To Do',
      value: 'todo',
    },
    {
      name: 'In Progress',
      value: 'in-progress',
    },
    {
      name: 'Done',
      value: 'done',
    },
  ];

  onSubmit() {
    console.log('Form: ', this.addTodoForm);
    console.log('Form valid', this.addTodoForm.valid);
    console.log('Form values: ', this.addTodoForm.value);
  }
}
