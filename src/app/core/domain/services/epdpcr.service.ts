import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { EPDPCRModel } from '../models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class EpdpcrService extends BaseService<EPDPCRModel> {
  constructor(http: HttpClient) {
    super(`${environment.api.baseUrl}/api/epdpcrs`, http);
  }
}
