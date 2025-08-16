import { HttpClient } from '@angular/common/http';
import { TagResponse } from './../types/response/tag';
import { Injectable, computed, signal } from '@angular/core';
import { ResponseSuccess } from '../types/commons/commons';
import { Observable } from 'rxjs';

@Injectable()
export class TagsTodoService {
  private readonly _urlApi = 'localhost:5001/api/tags';
  private _tags = signal<TagResponse[]>([]);
  readonly tags = computed(() => this._tags());

  constructor(private _httpClient: HttpClient) {}

  //   Fetch Methods
  public getAllTags(): Observable<ResponseSuccess<TagResponse[]>> {
    return this._httpClient.get<ResponseSuccess<TagResponse[]>>(this._urlApi);
  }

  // Local State Getters
}
