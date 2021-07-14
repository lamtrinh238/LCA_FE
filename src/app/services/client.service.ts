import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Client } from '../routes/client/models/client';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}

  getListClient = (token: string, search: string) => {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${token} ` }),
    };

    return this.http.get(`${environment.api.baseUrl}/api/Clients${search}`, httpOptions).pipe(
      map((clients) => {
        return clients as Client[];
      }),
    );
  };

  getCountClient = (token: string) => {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${token} ` }),
    };
    return this.http.get(`${environment.api.baseUrl}/api/Clients/count`, httpOptions).pipe(
      map((data: any) => {
        return data.count as number;
      }),
    );
  };
}
