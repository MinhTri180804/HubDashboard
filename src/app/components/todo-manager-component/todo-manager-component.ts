import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, computed, signal, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardTodoComponent } from '../card-todo-component/card-todo-component';
import { TodoItemComponent } from '../todo-item-component/todo-item-component';
import { TodoService } from '../../services/todo-service';
import { StateTodoEnum } from '../../enums/stateTodoEnum';
import { TodoInfo } from '../../types/todo';

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
export class TodoManagerComponent {
  todoService = inject(TodoService);

  todoPending = signal<TodoInfo[]>([]);
  todoInProcess = signal<TodoInfo[]>([]);
  todoDone = signal<TodoInfo[]>([]);

  // todoPending = computed(() =>
  //   this.todoService.getTodoByState(StateTodoEnum.TODO)
  // );
  // todoInProcess = computed(() =>
  //   this.todoService.getTodoByState(StateTodoEnum.IN_PROCESS)
  // );
  // todoDone = computed(() =>
  //   this.todoService.getTodoByState(StateTodoEnum.DONE)
  // );

  constructor() {}

  handleDrop(event: CdkDragDrop<TodoInfo[]>) {
    if (event.previousContainer === event.container) {
      // Reorder within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log(event);
  }

  private getStateFromContainerId(containerId: string): StateTodoEnum {
    switch (containerId) {
      case 'todo-pending':
        return StateTodoEnum.TODO;
      case 'todo-in-process':
        return StateTodoEnum.IN_PROCESS;
      case 'todo-done':
        return StateTodoEnum.DONE;
      default:
        throw new Error(`Unknown container ID: ${containerId}`);
    }
  }
}
