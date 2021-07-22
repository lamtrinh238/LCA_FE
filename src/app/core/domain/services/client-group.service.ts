import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ClientGroupModel } from '../models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ClientGroupService extends BaseService<ClientGroupModel> {
  constructor(http: HttpClient) {
    super(`${environment.api.baseUrl}/api/clientgroups`, http);
  }
}
