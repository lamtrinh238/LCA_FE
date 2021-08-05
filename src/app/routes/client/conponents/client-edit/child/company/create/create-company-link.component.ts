import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ClientModel, ClientService, QueryParamObject } from '@core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'lca-create-company-link',
    templateUrl: './create-company-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyLinkComponent implements OnInit {
    clients$: Observable<ClientModel[]>;
    selectedValue = null;
    private readonly fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
    fetchDataStart$ = this.fetchDataSource.asObservable();
    protected queryObject: QueryParamObject;

    constructor(private _clientService: ClientService) {
        this.queryObject = new QueryParamObject([], 1, 2000, []);
    }

    ngOnInit(): void {
        this.clients$ = this.fetchDataStart$.pipe(
            filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
            switchMap(() => this._clientService.filter(this.queryObject)),
            tap(),
        );
        this.fetchDataSource.next(this.queryObject);
    }
}
