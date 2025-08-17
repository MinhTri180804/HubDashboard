import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { ResponseSuccess } from '../types/commons/commons';
import { Observable, tap } from 'rxjs';
import { TagInfo } from '../types/tag';

@Injectable()
export class TagsTodoService {
  private readonly _urlApi = 'localhost:5001/api/tags';
  private _tags = signal<TagInfo[]>([]);
  readonly tags = computed(() => this._tags());

  constructor(private _httpClient: HttpClient) {}

  //   Fetch Methods
  public fetchAllTags(): Observable<ResponseSuccess<TagInfo[]>> {
    return this._httpClient.get<ResponseSuccess<TagInfo[]>>(this._urlApi).pipe(
      tap((response) => {
        this._tags.set(response);
      })
    );
  }

  // Local State Getters
}
