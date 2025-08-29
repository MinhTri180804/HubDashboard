import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface CreateTaskStateForm {
  name: FormControl<string>;
}

export type CreateTaskStateFormData = {
  name: string;
};

@Component({
  selector: 'app-form-create-task-state-component',
  imports: [ReactiveFormsModule],
  templateUrl: './form-create-task-state-component.html',
  styleUrl: './form-create-task-state-component.scss',
})
export class FormCreateTaskStateComponent {
  onCreateTaskState = output<CreateTaskStateFormData>();

  createTaskStateForm = new FormGroup<CreateTaskStateForm>({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (!this.createTaskStateForm.valid) {
      // TODO: Implement handle form invalid
      return;
    }

    this.onCreateTaskState.emit({
      name: this.createTaskStateForm.value.name!,
    });
  }
}
