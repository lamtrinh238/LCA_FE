import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    const currentUserObject = JSON.parse(localStorage.getItem('currentUser')!);
    const userId = currentUserObject.usrId;
    return this.http.get<any>(`${environment.api.baseUrl}/api/Users/${userId}`);
  }
}
