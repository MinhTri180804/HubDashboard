import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from '../../components/breadcrumb-component/breadcrumb-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { DialogCreateTodoComponent } from '../../components/dialog-create-todo-component/dialog-create-todo-component';
import { DropdownComponent } from '../../components/dropdown-component/dropdown-component';
import { DropdownItemComponent } from '../../components/dropdown-item-component/dropdown-item-component';
import { TodoManagerComponent } from '../../components/task-manager-component/task-manager-component';
import { DialogCreateTaskService } from '../../services/dialog-create-task-service';
import { EmployeesService } from '../../services/employees-service';
import { TagsTodoService } from '../../services/tags-todo-service';
import { TaskService } from '../../services/task-service';
import { TaskStateService } from '../../services/task-state-service';
import { DialogCreateTaskState } from '../../services/dialog-create-task-state';
import { DialogCreateTaskStateComponent } from "../../components/dialog-create-task-state-component/dialog-create-task-state-component";

@Component({
  selector: 'app-scrum-board-page',
  imports: [
    BreadcrumbComponent,
    ButtonComponent,
    MatIconModule,
    DropdownComponent,
    DropdownItemComponent,
    TodoManagerComponent,
    DialogCreateTodoComponent,
    DialogCreateTaskStateComponent
],
  templateUrl: './scrum-board-page.html',
  styleUrl: './scrum-board-page.scss',
  providers: [
    DialogCreateTaskService,
    DialogCreateTaskState,
    TaskService,
    EmployeesService,
    TagsTodoService,
    TaskStateService,
  ],
})
export class ScrumBoardPage implements OnInit {
  private dialogCreateTodoService = inject(DialogCreateTaskService);
  private dialogCreateTaskStateService = inject(DialogCreateTaskState);

  projects = signal(projectsMockData);

  constructor() {}

  ngOnInit(): void {}

  openDialogCreateTask() {
    this.dialogCreateTodoService.open();
  }

  openDialogCreateTaskState() {
    this.dialogCreateTaskStateService.open();
  }
}

const projectsMockData = [
  {
    name: 'project/mobile-app-dev',
  },
  {
    name: 'project/bootstrap-5',
  },
  {
    name: 'project/mvc-version',
  },
  {
    name: 'project/ruby-version',
  },
];
