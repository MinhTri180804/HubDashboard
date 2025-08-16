import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';
import { EmployeeInfo } from '../types/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly _urlApi = 'localhost:5001/api/employees';
  private _employees = signal<EmployeeInfo[]>([]);
  readonly employees = computed(() => this._employees());
  constructor(private _httpClient: HttpClient) {}

  // Fetch Methods
  public fetchAllEmployees(): Observable<ResponseSuccess<EmployeeInfo[]>> {
    return this._httpClient.get<ResponseSuccess<EmployeeInfo[]>>(this._urlApi);
  }

  // Local State Getters
}
