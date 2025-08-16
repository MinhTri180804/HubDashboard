import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from '../../components/breadcrumb-component/breadcrumb-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { DropdownComponent } from '../../components/dropdown-component/dropdown-component';
import { DropdownItemComponent } from '../../components/dropdown-item-component/dropdown-item-component';
import { TodoManagerComponent } from '../../components/todo-manager-component/todo-manager-component';
import { DialogComponent } from '../../components/dialog-component/dialog-component';

@Component({
  selector: 'app-scrum-board-page',
  imports: [
    BreadcrumbComponent,
    ButtonComponent,
    MatIconModule,
    DropdownComponent,
    DropdownItemComponent,
    TodoManagerComponent,
    DialogComponent,
  ],
  templateUrl: './scrum-board-page.html',
  styleUrl: './scrum-board-page.scss',
})
export class ScrumBoardPage {
  isOpenDialogAddTodo = signal<boolean>(false);

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

  openDialogAddTodo() {
    this.isOpenDialogAddTodo.set(true);
  }

  closeDialogAddTodo() {
    this.isOpenDialogAddTodo.set(false);
  }

  changeDialogAddTodo(value: boolean) {
    this.isOpenDialogAddTodo.set(value);
  }
}
