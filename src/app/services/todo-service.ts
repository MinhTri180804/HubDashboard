import { computed, Injectable } from '@angular/core';
import { TodoInfo } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly _urlApi = 'localhost:5001/api/todos';
  private _todos: TodoInfo[] = [];
  readonly todos = computed(() => this._todos);

  constructor(private _httpClient: HttpClient) {}

  // Fetch Methods

  public fetchAllTodos(): Observable<ResponseSuccess<TodoInfo[]>> {
    return this._httpClient.get<ResponseSuccess<TodoInfo[]>>(this._urlApi);
  }

  // Local State Getters
}
