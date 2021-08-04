import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ForgotPasswordModel, PasswordChange, UserModel } from '../models';
import { BaseService } from './base.service';
@Injectable({
    providedIn: 'root',
})
export class ForgotPasswordService extends BaseService<ForgotPasswordModel> {
    constructor(httpClient: HttpClient) {
        super(`${environment.api.baseUrl}/api/forgotPassword`, httpClient);
    }
}
