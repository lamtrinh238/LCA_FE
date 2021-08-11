import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UserComLinkModel } from '../models';
import { BaseService } from './base.service';
@Injectable({
    providedIn: 'root',
})
export class UserComLinkService extends BaseService<UserComLinkModel> {
    constructor(httpClient: HttpClient) {
        super(`${environment.api.baseUrl}/api/UserCompLink/usercompLink`, httpClient);
    }
}
