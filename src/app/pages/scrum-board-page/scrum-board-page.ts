import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from '../../components/breadcrumb-component/breadcrumb-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { DialogCreateTodoComponent } from '../../components/dialog-create-todo-component/dialog-create-todo-component';
import { DropdownComponent } from '../../components/dropdown-component/dropdown-component';
import { DropdownItemComponent } from '../../components/dropdown-item-component/dropdown-item-component';
import { TodoManagerComponent } from '../../components/task-manager-component/task-manager-component';
import { DialogCreateTodoService } from '../../services/dialog-create-todo-service';
import { EmployeesService } from '../../services/employees-service';
import { TagsTodoService } from '../../services/tags-todo-service';
import { TaskService } from '../../services/task-service';
import { TaskStateService } from '../../services/task-state-service';

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
  ],
  templateUrl: './scrum-board-page.html',
  styleUrl: './scrum-board-page.scss',
  providers: [
    DialogCreateTodoService,
    TaskService,
    EmployeesService,
    TagsTodoService,
    TaskStateService,
  ],
})
export class ScrumBoardPage implements OnInit {
  projectsMockData = [
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

  constructor(private dialogCreateTodoService: DialogCreateTodoService) {}

  ngOnInit(): void {}

  openDialogAddTodo() {
    this.dialogCreateTodoService.open();
  }
}
