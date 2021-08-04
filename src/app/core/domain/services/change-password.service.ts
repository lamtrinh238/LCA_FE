import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PasswordChange, UserModel } from '../models';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService extends BaseService<PasswordChange> {
  constructor(httpClient: HttpClient) {
    super(`${environment.api.baseUrl}/api/users`, httpClient);
  }

  update(userID: number, updateModel: PasswordChange): Observable<unknown> {
    return this.httpClient.put<unknown>(`${this.baseUrl}/${userID}/changePassword`, updateModel);
  }
}
