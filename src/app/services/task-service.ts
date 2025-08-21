import { computed, Injectable, signal } from '@angular/core';
import { TaskInfo } from '../types/task';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';
import { CreateTaskResponse } from '../types/response/task';
import { CreateTaskRequestBody } from '../types/request/task';
import { TaskStateConstantsValues } from '../constants/todoStateConstants';
import { rxResource } from '@angular/core/rxjs-interop';

type GetAllTasksParams = {};

type GetTasksByTaskStateIdParams = {
  stateId: string;
};

const TASKS_DEFAULT_VALUE = [] as TaskInfo[];

@Injectable()
export class TaskService {
  private readonly _urlApi = 'localhost:5001/api/todos';
  private readonly _urlApiSubTask = 'localhost:5001/api/subtodos';

  tasks = rxResource<ResponseSuccess<TaskInfo[]>, GetAllTasksParams>({
    params: () => ({}),
    stream: () => this._getAllTasks(),
    defaultValue: TASKS_DEFAULT_VALUE,
  });

  constructor(private _httpClient: HttpClient) {}

  private _getAllTasks(): Observable<ResponseSuccess<TaskInfo[]>> {
    return this._httpClient.get<ResponseSuccess<TaskInfo[]>>(this._urlApi);
  }

  public getTasksByStateId(params: GetTasksByTaskStateIdParams) {
    const urlApi = `${this._urlApi}/state/${params.stateId}`;
    return this._httpClient.get<ResponseSuccess<TaskInfo[]>>(urlApi);
  }

  public createTask(
    data: CreateTaskRequestBody
  ): Observable<ResponseSuccess<CreateTaskResponse>> {
    return this._httpClient
      .post<ResponseSuccess<CreateTaskResponse>>(this._urlApi, data)
      .pipe(tap((response) => this._addTask(response)));
  }

  public updateState({
    taskId,
    state,
  }: {
    taskId: string;
    state: TaskStateConstantsValues;
  }) {
    return this._httpClient.put<ResponseSuccess<CreateTaskResponse>>(
      `${this._urlApi}/${taskId}/status`,
      {
        state,
      }
    );
  }

  public updateStateSubTodo(
    taskId: string,
    subTaskId: string,
    checked: boolean
  ) {
    return this._httpClient
      .put(`${this._urlApiSubTask}/${subTaskId}/toggle-status`, {
        isDone: checked,
      })
      .pipe(tap(() => this._toggleIsDoneSubTask(taskId, subTaskId, checked)));
  }

  public deleteTask(taskId: string) {
    return this._httpClient
      .delete(`${this._urlApi}/${taskId}`)
      .pipe(tap(() => this._deleteTask(taskId)));
  }
  // Local State Getters

  // Private
  private _addTask(data: TaskInfo) {
    this.tasks.update((prev) => [...prev, data]);
  }

  private _updateStateTask(taskId: string, state: TaskStateConstantsValues) {
    this.tasks.update((prev) => {
      return prev.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            state: state,
          };
        }

        return task;
      });
    });
  }

  private _deleteTask(taskId: string) {
    this.tasks.update((prev) => {
      return prev.filter((todo) => todo._id !== taskId);
    });
  }

  private _toggleIsDoneSubTask(
    taskId: string,
    subTaskId: string,
    checked: boolean
  ) {
    this.tasks.update((prev) => {
      return prev.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            subTasks: task.subTasks.map((subTask) => {
              if (subTask._id === subTaskId) {
                return {
                  ...subTask,
                  isDone: !subTask.isDone,
                };
              }
              return subTask;
            }),
          };
        }
        return task;
      });
    });
  }
}
