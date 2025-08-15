import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardTodoComponent } from '../card-todo-component/card-todo-component';
import { TodoItemComponent } from '../todo-item-component/todo-item-component';

@Component({
  selector: 'app-todo-manager-component',
  imports: [
    CardTodoComponent,
    MatIcon,
    TodoItemComponent,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './todo-manager-component.html',
  styleUrl: './todo-manager-component.scss',
})
export class TodoManagerComponent {}
