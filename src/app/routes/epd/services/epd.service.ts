import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Epd } from '../models/epd';

@Injectable({
  providedIn: 'root',
})
export class EpdService {
  constructor() {}

  getUnverifiedEpds(): Observable<Epd[]> {
    return of([{} as Epd]);
  }
}
