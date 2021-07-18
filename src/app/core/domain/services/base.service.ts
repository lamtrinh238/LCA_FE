import { HttpClient } from '@angular/common/http';
import { QueryParamObject } from '@core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHelper } from '../../helpers';
import { UserAddingModel } from '@core';

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
