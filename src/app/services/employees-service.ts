import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { EmployeeResponse } from '../types/response/employee';
import { Observable } from 'rxjs';
import { ResponseSuccess } from '../types/commons/commons';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly _urlApi = 'localhost:5001/api/employees';
  private _employees = signal<EmployeeResponse[]>([]);
  readonly employees = computed(() => this._employees());
  constructor(private _httpClient: HttpClient) {}

  // Fetch Methods
  public fetchAllEmployees(): Observable<ResponseSuccess<EmployeeResponse[]>> {
    return this._httpClient.get<ResponseSuccess<EmployeeResponse[]>>(
      this._urlApi
    );
  }

  // Local State Getters
}
