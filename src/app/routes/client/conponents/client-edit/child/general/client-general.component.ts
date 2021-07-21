import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientModel, ClientService } from '@core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lca-client-general',
  templateUrl: './client-general.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientGeneralComponent implements OnInit {
  client$: ClientModel;
  private fetchDataSource = new BehaviorSubject<undefined>(undefined);
  fetchDataStart$ = this.fetchDataSource.asObservable();
  clientID: string;

  constructor(private route: ActivatedRoute, private clientService: ClientService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clientID = params.clientID;
      this.clientService.get(params.clientID).subscribe((c: ClientModel) => (this.client$ = c));
    });
  }
}
