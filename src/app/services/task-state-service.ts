import { HttpClient } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { ResponseSuccess } from '../types/commons/commons';
import { TaskStateInfo } from '../types/taskState';
import { rxResource } from '@angular/core/rxjs-interop';

type GetAllParams = {};

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

  private _getAll() {
    return this._httpClient.get<ResponseSuccess<TaskStateInfo[]>>(this._urlApi);
  }
}
