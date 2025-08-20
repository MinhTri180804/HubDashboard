import { Component, computed, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {
  TaskStateConstants,
  TaskStateConstantsValues,
} from '../../constants/todoStateConstants';
import { TagsTodoService } from '../../services/tags-todo-service';
import { TaskService } from '../../services/task-service';
import { TagInfo } from '../../types/tag';
import { MultiSelectTagComponent } from '../multi-select-tag-component/multi-select-tag-component';
import { EmployeeInfo } from '../../types/employee';
import { EmployeesService } from '../../services/employees-service';
import { InputAddSubTodoComponent } from '../input-add-sub-todo-component/input-add-sub-todo-component';

interface CreateTodoForm {
  name: FormControl<string>;
  state: FormControl<TaskStateConstantsValues>;
  tagIds: FormControl<TagInfo[]>;
  assignedTo: FormControl<string | null>;
  createdBy: FormControl<string | null>;
  deadline: FormControl<number | null>;
  subTodos: FormControl<string[]>;
}

export type CreateTodoFormData = {
  name: string;
  state: TaskStateConstantsValues;
  tagIds: string[];
  assignedTo: string;
  createdBy: string;
  deadline: number;
  subTodos: {
    name: string;
    isDone: boolean;
    order: number;
  }[];
};

type StatusTodo = {
  name: string;
  value: TaskStateConstantsValues;
}[];

@Component({
  selector: 'app-form-create-todo-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectTagComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    InputAddSubTodoComponent,
  ],
  templateUrl: './form-create-todo-component.html',
  styleUrl: './form-create-todo-component.scss',
})
export class FormCreateTodoComponent {
  tagsService = inject(TagsTodoService);
  todosService = inject(TaskService);
  employeesService = inject(EmployeesService);

  employeesData = this.employeesService.employees.value;

  today = new Date();
  onCreateTodo = output<CreateTodoFormData>();
  addTodoForm = new FormGroup<CreateTodoForm>({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
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
    assignedTo: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    createdBy: new FormControl(null, {
      validators: [Validators.required],
    }),
    deadline: new FormControl(null, {
      validators: [Validators.required],
    }),
    subTodos: new FormControl([], {
      nonNullable: true,
    }),
  });

  status: StatusTodo = [
    {
      name: 'To do',
      value: TaskStateConstants.TODO,
    },
    {
      name: 'In progress',
      value: TaskStateConstants.IN_PROGRESS,
    },
    {
      name: 'Done',
      value: TaskStateConstants.COMPLETED,
    },
  ];

  onSubmit() {
    if (!this.addTodoForm.valid) {
      // TODO: Implement logic handle form invalid
      return;
    }

    this.onCreateTodo.emit({
      name: this.addTodoForm.value.name || '',
      state: this.addTodoForm.value.state || TaskStateConstants.TODO,
      tagIds: this.addTodoForm.value.tagIds!.map((tag) => tag._id),
      assignedTo: this.addTodoForm.value.assignedTo as string,
      createdBy: this.addTodoForm.value.createdBy as string,
      deadline: new Date(Number(this.addTodoForm.value.deadline)).getTime(),
      subTodos: this.addTodoForm.value.subTodos
        ? this.addTodoForm.value.subTodos.map((sub, idx) => ({
            name: sub,
            isDone: false,
            order: idx,
          }))
        : [],
    });

    this.addTodoForm.reset({
      name: '',
      state: 'todo',
      tagIds: [],
      assignedTo: null,
      createdBy: null,
      deadline: null,
      subTodos: [],
    });
  }
}
