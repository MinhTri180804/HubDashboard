import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';
import { EmployeeInfo } from '../types/employee';
import { rxResource } from '@angular/core/rxjs-interop';

type GetAllEmployeesParams = {};

const EMPLOYEES_DEFAULT_VALUE = [] as EmployeeInfo[];

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly _urlApi = 'localhost:5001/api/employees';

  employees = rxResource<
    ResponseSuccess<EmployeeInfo[]>,
    GetAllEmployeesParams
  >({
    params: () => ({}),
    stream: () => this._getAllEmployees(),
    defaultValue: EMPLOYEES_DEFAULT_VALUE,
  });

  constructor(private _httpClient: HttpClient) {}

  private _getAllEmployees(): Observable<ResponseSuccess<EmployeeInfo[]>> {
    return this._httpClient.get<ResponseSuccess<EmployeeInfo[]>>(this._urlApi);
  }
}
