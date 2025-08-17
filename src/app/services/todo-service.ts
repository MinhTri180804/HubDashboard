import { computed, Injectable, signal } from '@angular/core';
import { TodoInfo } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';
import { CreateTodoResponse } from '../types/response/todo';
import { CreateTodoRequestBody } from '../types/request/todo';
import { TodoStateConstantsValues } from '../constants/todoStateConstants';

@Injectable()
export class TodoService {
  private readonly _urlApi = 'localhost:5001/api/todos';
  private readonly _urlApiSubTodo = 'localhost:5001/api/subtodos';

  private _todos = signal<TodoInfo[]>([]);

  readonly todos = computed(() => this._todos());
  readonly todosPending = computed(() =>
    this._todos().filter((todo) => todo.state === 'pending')
  );
  readonly todosDone = computed(() =>
    this._todos().filter((todo) => todo.state === 'completed')
  );
  readonly todosInprogress = computed(() =>
    this._todos().filter((todo) => todo.state === 'in-progress')
  );

  constructor(private _httpClient: HttpClient) {}

  // Fetch Methods

  public fetchAllTodos(): Observable<ResponseSuccess<TodoInfo[]>> {
    return this._httpClient.get<ResponseSuccess<TodoInfo[]>>(this._urlApi).pipe(
      tap((response) => {
        this._todos.set(response);
      })
    );
  }

  public createTodo(
    data: CreateTodoRequestBody
  ): Observable<ResponseSuccess<CreateTodoResponse>> {
    return this._httpClient
      .post<ResponseSuccess<CreateTodoResponse>>(this._urlApi, data)
      .pipe(tap((response) => this._addTodo(response)));
  }

  public updateState({
    todoId,
    state,
  }: {
    todoId: string;
    state: TodoStateConstantsValues;
  }) {
    return this._httpClient
      .put<ResponseSuccess<CreateTodoResponse>>(
        `${this._urlApi}/${todoId}/status`,
        {
          state,
        }
      )
      .pipe(tap(() => this._updateStateTodo(todoId, state)));
  }

  public updateStateSubTodo(
    todoId: string,
    subTodoId: string,
    checked: boolean
  ) {
    return this._httpClient
      .put(`${this._urlApiSubTodo}/${subTodoId}/toggle-status`, {
        isDone: checked,
      })
      .pipe(tap(() => this._toggleIsDoneSubTodo(todoId, subTodoId, checked)));
  }

  public deleteTodo(todoId: string) {
    return this._httpClient
      .delete(`${this._urlApi}/${todoId}`)
      .pipe(tap(() => this._deleteTodo(todoId)));
  }
  // Local State Getters

  // Private
  private _addTodo(data: TodoInfo) {
    this._todos.update((prev) => [...prev, data]);
  }

  private _updateStateTodo(todoId: string, state: TodoStateConstantsValues) {
    this._todos.update((prev) => {
      return prev.map((todo) => {
        if (todo._id === todoId) {
          return {
            ...todo,
            state: state,
          };
        }

        return todo;
      });
    });
  }

  private _deleteTodo(todoId: string) {
    this._todos.update((prev) => {
      return prev.filter((todo) => todo._id !== todoId);
    });
  }

  private _toggleIsDoneSubTodo(
    todoId: string,
    subTodoId: string,
    checked: boolean
  ) {
    this._todos.update((prev) => {
      return prev.map((todo) => {
        if (todo._id === todoId) {
          return {
            ...todo,
            subTodos: todo.subTodos.map((subTodo) => {
              if (subTodo._id === subTodoId) {
                return {
                  ...subTodo,
                  isDone: !subTodo.isDone,
                };
              }
              return subTodo;
            }),
          };
        }
        return todo;
      });
    });
  }
}
