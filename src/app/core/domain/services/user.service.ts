import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserModel> {
  constructor(httpClient: HttpClient) {
    super(`${environment.api.baseUrl}/api/users`, httpClient);
  }
}
