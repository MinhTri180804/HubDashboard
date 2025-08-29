import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskStateConstantsValues } from '../../constants/todoStateConstants';
import { EmployeesService } from '../../services/employees-service';
import { TagsTodoService } from '../../services/tags-todo-service';
import { TaskService } from '../../services/task-service';
import { TaskStateService } from '../../services/task-state-service';
import { TagInfo } from '../../types/tag';
import { InputAddSubTodoComponent } from '../input-add-sub-todo-component/input-add-sub-todo-component';
import { MultiSelectTagComponent } from '../multi-select-tag-component/multi-select-tag-component';

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
  taskStateService = inject(TaskStateService);

  employeesData = this.employeesService.employees.value;
  taskStateData = this.taskStateService.taskState.value;

  today = new Date();
  onCreateTodo = output<CreateTodoFormData>();
  addTaskForm = new FormGroup<CreateTodoForm>({
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

  onSubmit() {
    if (!this.addTaskForm.valid) {
      // TODO: Implement logic handle form invalid
      return;
    }

    this.onCreateTodo.emit({
      name: this.addTaskForm.value.name || '',
      state:
        this.addTaskForm.value.state || this.taskStateService.taskStateIds()[0],
      tagIds: this.addTaskForm.value.tagIds!.map((tag) => tag._id),
      assignedTo: this.addTaskForm.value.assignedTo as string,
      createdBy: this.addTaskForm.value.createdBy as string,
      deadline: new Date(Number(this.addTaskForm.value.deadline)).getTime(),
      subTodos: this.addTaskForm.value.subTodos
        ? this.addTaskForm.value.subTodos.map((sub, idx) => ({
            name: sub,
            isDone: false,
            order: idx,
          }))
        : [],
    });

    this.addTaskForm.reset({
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
