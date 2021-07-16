import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
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
