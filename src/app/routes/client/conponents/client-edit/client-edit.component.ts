import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientModel, ClientService } from '@core';
import { BehaviorSubject, Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

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

  constructor(private route: ActivatedRoute, private clientService: ClientService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clientID = params.clientID;
      this.clientService.get(params.clientID).subscribe((c: ClientModel) => (this.client$ = c));
    });
  }
}
