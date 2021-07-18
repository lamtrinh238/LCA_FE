import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ClientModel } from '../models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseService<ClientModel> {
  constructor(http: HttpClient) {
    super(`${environment.api.baseUrl}/api/clients`, http);
  }
}
