import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Client } from '../routes/client/models/client';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}

  getListClient = (token: string, params: HttpParams) => {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${token} ` }),
      params,
    };

    return this.http.get(`${environment.api.baseUrl}/api/Clients`, httpOptions).pipe(
      map((data: any) => {
        return {
          clients: data.clients as Client[],
          count: data.count as number,
        };
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
