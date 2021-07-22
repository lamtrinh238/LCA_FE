import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CountryModel } from '../models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class CountryService extends BaseService<CountryModel> {
  constructor(http: HttpClient) {
    super(`${environment.api.baseUrl}/api/countries`, http);
  }
}
