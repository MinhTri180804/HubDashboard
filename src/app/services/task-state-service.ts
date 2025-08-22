import { HttpClient } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';
import { CreateTaskStateRequestBody } from '../types/request/taskState';
import { TaskStateInfo } from '../types/taskState';

type GetAllParams = {};

type CreateParams = CreateTaskStateRequestBody;

const TASK_STATE_DEFAULT_VALUE = [] as TaskStateInfo[];

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private _urlApi = 'localhost:5001/api/states';
  constructor(private _httpClient: HttpClient) {}

  taskState = rxResource<ResponseSuccess<TaskStateInfo[]>, GetAllParams>({
    params: () => ({}),
    stream: () => this._getAll(),
    defaultValue: TASK_STATE_DEFAULT_VALUE,
  });
  taskStateIds = computed(() => {
    return this.taskState.value().map((item) => item._id);
  });

  public create(data: CreateParams) {
    return this._httpClient
      .post<ResponseSuccess<TaskStateInfo>>(this._urlApi, data)
      .pipe(tap((response) => this._create(response)));
  }

  public delete(taskStateId: string) {
    const apiUrl = `${this._urlApi}/${taskStateId}`;
    return this._httpClient
      .delete(apiUrl)
      .pipe(tap(() => this._delete(taskStateId)));
  }

  private _getAll() {
    return this._httpClient.get<ResponseSuccess<TaskStateInfo[]>>(this._urlApi);
  }

  private _delete(taskStateId: string) {
    this.taskState.value.set(
      this.taskState.value().filter((state) => state._id !== taskStateId)
    );
  }

  private _create(taskState: TaskStateInfo) {
    this.taskState.update((prev) => [...prev, taskState]);
  }
}
