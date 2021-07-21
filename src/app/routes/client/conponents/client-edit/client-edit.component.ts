import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientModel } from '@core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lca-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditComponent implements OnInit {
  client$: ClientModel;
  private fetchDataSource = new BehaviorSubject<undefined>(undefined);
  fetchDataStart$ = this.fetchDataSource.asObservable();
  clientID: string;
  selectedClientFeature = 0;

  features = [
    'General infomation',
    'Users',
    'Companies',
    'Default values in A2 EPD',
    'Default values in A3 EPD',
    'Default values in A4 EPD',
    'Register setup',
    'EPD processes',
  ];

  constructor() {}

  ngOnInit(): void {}

  onClientFeatureChange(feature: number): void {
    this.selectedClientFeature = feature;
  }
}
