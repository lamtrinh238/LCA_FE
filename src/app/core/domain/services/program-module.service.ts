import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ProgramModuleModel } from '../models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ProgramModuleService extends BaseService<ProgramModuleModel> {
  constructor(http: HttpClient) {
    super(`${environment.api.baseUrl}/api/programmodules`, http);
  }
}
