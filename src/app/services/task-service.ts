import { computed, Injectable, ResourceRef, signal } from '@angular/core';
import { TaskInfo } from '../types/task';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';
import { CreateTaskResponse } from '../types/response/task';
import { CreateTaskRequestBody } from '../types/request/task';
import { TaskStateConstantsValues } from '../constants/todoStateConstants';
import { rxResource } from '@angular/core/rxjs-interop';

type GetAllTasksParams = {};

const TASKS_DEFAULT_VALUE = [] as TaskInfo[];

@Injectable()
export class TaskService {
  private readonly _urlApi = 'localhost:5001/api/todos';
  private readonly _urlApiSubTask = 'localhost:5001/api/subtodos';

  constructor(private _httpClient: HttpClient) {}

  tasksData = rxResource<ResponseSuccess<TaskInfo[]>, GetAllTasksParams>({
    params: () => ({}),
    stream: () => this._getAllTasks(),
    defaultValue: TASKS_DEFAULT_VALUE,
  });

  private _getAllTasks() {
    return this._httpClient.get<ResponseSuccess<TaskInfo[]>>(this._urlApi);
  }

  public createTask(
    data: CreateTaskRequestBody
  ): Observable<ResponseSuccess<CreateTaskResponse>> {
    return this._httpClient
      .post<ResponseSuccess<CreateTaskResponse>>(this._urlApi, data)
      .pipe(tap((response) => this._createTask(response)));
  }

  public updateState({
    taskId,
    state,
  }: {
    taskId: string;
    state: TaskStateConstantsValues;
  }) {
    const apiUrl = `${this._urlApi}/${taskId}/status`;
    return this._httpClient
      .put<ResponseSuccess<CreateTaskResponse>>(apiUrl, {
        state,
      })
      .pipe(tap((response) => this._updateStateTodo(response)));
  }

  public updateStateSubTodo(
    taskId: string,
    subTaskId: string,
    checked: boolean
  ) {
    const apiUrl = `${this._urlApiSubTask}/${subTaskId}/toggle-status`;
    return this._httpClient
      .put(apiUrl, {
        isDone: checked,
      })
      .pipe(tap(() => this._toggleIsDoneSubTask(taskId, subTaskId, checked)));
  }

  public deleteTask(taskId: string) {
    const apiUrl = `${this._urlApi}/${taskId}`;
    return this._httpClient
      .delete(apiUrl)
      .pipe(tap(() => this._deleteTask(taskId)));
  }

  private _deleteTask(taskId: string) {
    this.tasksData.value.set(
      this.tasksData.value().filter((task) => task._id !== taskId)
    );
  }

  private _createTask(data: TaskInfo) {
    this.tasksData.value.update((prev) => [...prev, data]);
  }

  private _toggleIsDoneSubTask(
    taskId: string,
    subTaskId: string,
    checked: boolean
  ) {
    this.tasksData.update((prev) => {
      return prev.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            subTodos: task.subTodos.map((subTask) => {
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

  private _updateStateTodo(taskUpdated: TaskInfo) {
    this.tasksData.value.set(
      this.tasksData.value().map((task) => {
        if (task._id === taskUpdated._id) {
          return {
            ...task,
            state: taskUpdated.state,
          };
        }

        return task;
      })
    );
  }
}
