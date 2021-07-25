import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryParamObject, UserModel } from '@core';
import { Observable } from 'rxjs';
import { HttpHelper } from '../../helpers';

export class BaseService<T extends { [key: string]: any }> {
  constructor(protected baseUrl: string, protected httpClient: HttpClient) {}

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + `/${id}`);
  }

  getList(filterParams: any): Observable<T[]> {
    return this.httpClient.get<T[]>(this.baseUrl, {
      params: HttpHelper.objectToHttpParams(filterParams),
    });
  }

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
}
