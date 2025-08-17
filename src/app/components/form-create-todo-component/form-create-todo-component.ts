import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TodoStateConstants,
  TodoStateConstantsValues,
} from '../../constants/todoStateConstants';
import { TagsTodoService } from '../../services/tags-todo-service';
import { TodoService } from '../../services/todo-service';
import { TagInfo } from '../../types/tag';
import { MultiSelectTagComponent } from '../multi-select-tag-component/multi-select-tag-component';

interface CreateTodoForm {
  name: FormControl<string>;
  state: FormControl<TodoStateConstantsValues>;
  tagIds: FormControl<TagInfo[]>;
}

export type CreateTodoFormData = {
  name: string;
  state: TodoStateConstantsValues;
  tagIds: string[];
  assignedTo: string;
  createdBy: string;
  deadline: number;
};

type StatusTodo = {
  name: string;
  value: TodoStateConstantsValues;
}[];

@Component({
  selector: 'app-form-create-todo-component',
  imports: [ReactiveFormsModule, MultiSelectTagComponent],
  templateUrl: './form-create-todo-component.html',
  styleUrl: './form-create-todo-component.scss',
})
export class FormCreateTodoComponent {
  tagsService = inject(TagsTodoService);
  todosService = inject(TodoService);

  onCreateTodo = output<CreateTodoFormData>();
  addTodoForm = new FormGroup<CreateTodoForm>({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    state: new FormControl('todo', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    tagIds: new FormControl([], {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  status: StatusTodo = [
    {
      name: 'To do',
      value: TodoStateConstants.TODO,
    },
    {
      name: 'In progress',
      value: TodoStateConstants.IN_PROGRESS,
    },
    {
      name: 'Done',
      value: TodoStateConstants.COMPLETED,
    },
  ];

  onSubmit() {
    if (!this.addTodoForm.valid) {
      // TODO: Implement logic handle form invalid
      return;
    }

    this.onCreateTodo.emit({
      name: this.addTodoForm.value.name || '',
      state: this.addTodoForm.value.state || TodoStateConstants.TODO,
      tagIds: this.addTodoForm.value.tagIds!.map((tag) => tag._id),
      assignedTo: '689f68f9d5b0e2fd4e3266a3',
      createdBy: '689f68f9d5b0e2fd4e3266a3',
      deadline: Math.floor(Date.now() / 1000),
    });
  }
}
