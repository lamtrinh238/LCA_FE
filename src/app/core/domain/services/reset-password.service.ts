import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ForgotPasswordModel, PasswordChange, ResetPasswordModel, UserModel } from '../models';
import { BaseService } from './base.service';
@Injectable({
    providedIn: 'root',
})
export class ResetPasswordService extends BaseService<ResetPasswordModel> {
    constructor(httpClient: HttpClient) {
        super(`${environment.api.baseUrl}/api/resetPassword`, httpClient);
    }
}
