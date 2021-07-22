import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@core';
import { UserModel } from '@core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<UserModel>{
  constructor(httpClient: HttpClient) {
    super(`${environment.api.baseUrl}/api/users`, httpClient);
  }
}
