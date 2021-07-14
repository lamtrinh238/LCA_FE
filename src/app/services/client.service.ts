import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Client } from '../routes/client/models/client';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}

  getListClient = (token: string) => {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${token} ` }),
    };
    return this.http.get(`${environment.api.baseUrl}/api/Clients`, httpOptions).pipe(
      map((clients) => {
        return clients as Client[];
      }),
    );
  };
}
