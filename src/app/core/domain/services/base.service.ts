import { HttpClient } from '@angular/common/http';
import { QueryParamObject, UserModel } from '@core';
import { Observable } from 'rxjs';
import { HttpHelper } from '../../helpers';

export class BaseService<T extends { [key: string]: any }> {
  constructor(protected baseUrl: string, protected httpClient: HttpClient) {}

  filter(filterParams: QueryParamObject): Observable<T[]> {
    return this.httpClient.get<T[]>(this.baseUrl, {
      params: HttpHelper.objectToHttpParams(filterParams.toApiFilterQuery()),
    });
  }

  add(createModel: T): Observable<unknown> {
    return this.httpClient.post<unknown>(this.baseUrl, createModel);
  }

  update(id: number | string | undefined, updateModel: T): Observable<unknown> {
    return this.httpClient.put<unknown>(`${this.baseUrl}/${id}`, updateModel);
  }

  getCurrentUser(id: number): Observable<unknown> {
    return this.httpClient.get<unknown>(`${this.baseUrl}/${id}`);
  }

  updateCurrentUser(id: number, updateModel: T): Observable<unknown> {
    return this.httpClient.put<unknown>(`${this.baseUrl}/${id}`, updateModel);
  }
}
