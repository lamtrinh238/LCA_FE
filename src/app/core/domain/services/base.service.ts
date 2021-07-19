import { HttpClient } from '@angular/common/http';
import { QueryParamObject } from '@core';
import { UserAddingModel } from '@core';
import { Observable } from 'rxjs';
import { HttpHelper } from '../../helpers';

export class BaseService<T extends { [key: string]: any }> {
  constructor(protected baseUrl: string, protected httpClient: HttpClient) {}

  filter(filterParams: QueryParamObject): Observable<T[]> {
    return this.httpClient.get<T[]>(this.baseUrl, {
      params: HttpHelper.objectToHttpParams(filterParams.toApiFilterQuery()),
    });
  }

  addUser(addUserParams: UserAddingModel): Observable<T[]> {
    return this.httpClient.post<T[]>(this.baseUrl, addUserParams);
  }
}
