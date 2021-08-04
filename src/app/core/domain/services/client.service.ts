import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from '@core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ClientModel, QueryParamObject } from '../models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseService<ClientModel> {
  constructor(http: HttpClient) {
    super(`${environment.api.baseUrl}/api/clients`, http);
  }

  getCompanies(filterParams: QueryParamObject, clientID: number): Observable<ClientModel[]> {
    return this.httpClient.get<ClientModel[]>(`${environment.api.baseUrl}/api/clients/${clientID}/companies`, {
      params: HttpHelper.objectToHttpParams(filterParams.toApiFilterQuery()),
    });
  }

  addComLink(createModel: any): Observable<unknown> {
    return this.httpClient.post<unknown>(`${environment.api.baseUrl}/api/clients/companies`, createModel);
  }
}
