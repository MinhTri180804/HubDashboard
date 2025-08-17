import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { StateTodoEnum } from '../../enums/stateTodoEnum';
import { TodoService } from '../../services/todo-service';
import { TodoInfo } from '../../types/todo';
import { CardTodoComponent } from '../card-todo-component/card-todo-component';
import { TodoItemComponent } from '../todo-item-component/todo-item-component';
import {
  TodoStateConstants,
  TodoStateConstantsValues,
} from '../../constants/todoStateConstants';

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
export class TodoManagerComponent implements OnInit {
  todoService = inject(TodoService);

  constructor() {}

  ngOnInit(): void {
    this.todoService.fetchAllTodos().subscribe();
  }

  handleDrop(event: CdkDragDrop<TodoInfo[]>) {
    if (event.previousContainer === event.container) {
      // Reorder within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      setTimeout(() => {
        this.todoService
          .updateState({
            todoId: event.container.data[event.currentIndex]._id,
            state: this.getStateFromContainerId(event.container.id),
          })
          .subscribe();
      }, 0);

      // Move between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getStateFromContainerId(
    containerId: string
  ): TodoStateConstantsValues {
    switch (containerId) {
      case 'todo-pending':
        return TodoStateConstants.TODO;
      case 'todo-in-process':
        return TodoStateConstants.IN_PROGRESS;
      case 'todo-done':
        return TodoStateConstants.COMPLETED;
      default:
        throw new Error(`Unknown container ID: ${containerId}`);
    }
  }
}
