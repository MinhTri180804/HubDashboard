import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { ResponseSuccess } from '../types/commons/commons';
import { Observable, tap } from 'rxjs';
import { TagInfo } from '../types/tag';
import { rxResource } from '@angular/core/rxjs-interop';

type GetAllTagsParams = {};

const TAGS_DEFAULT_VALUE = [] as TagInfo[];

@Injectable()
export class TagsTodoService {
  private readonly _urlApi = 'localhost:5001/api/tags';

  tags = rxResource<ResponseSuccess<TagInfo[]>, GetAllTagsParams>({
    params: () => ({}),
    stream: () => this._getAllTags(),
    defaultValue: TAGS_DEFAULT_VALUE,
  });

  constructor(private _httpClient: HttpClient) {}

  private _getAllTags(): Observable<ResponseSuccess<TagInfo[]>> {
    return this._httpClient.get<ResponseSuccess<TagInfo[]>>(this._urlApi);
  }
}
