import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseDataList, ClientModel, ClientService, ComSWID, FilterObject, QueryParamObject } from '@core';
import { _HttpClient } from '@delon/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { exhaustMap, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ClientListComponent } from '../conponents/client-list/client-list.component';

@Component({
  templateUrl: './client-home-page.component.html',
  styleUrls: ['./client-home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHomePageComponent implements OnInit {
  clients$: Observable<ClientModel[]>;
  private fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
  fetchDataStart$ = this.fetchDataSource.asObservable();
  isFiltering = false;
  protected queryObject: QueryParamObject;

  @ViewChild('clientListComp', { read: ClientListComponent }) clientListCompRef: ClientListComponent;
  comswValue = ComSWID.none;
  ComSWID = ComSWID;

  constructor(private clientService: ClientService) {}
  ngOnInit(): void {
    this.clients$ = this.fetchDataStart$
      .pipe(
        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
        tap(() => (this.isFiltering = true)),
        exhaustMap(() => this.clientService.filter(this.queryObject)),
        tap(() => (this.isFiltering = false)),
      )
      .pipe(
        finalize(() => {
          this.isFiltering = false;
        }),
      );
  }

  onOpenAddClient(): void {
    console.log();
  }

  onChangeComSW(comSw: ComSWID | null): void {
    this.queryObject.filter = [new FilterObject('ComSW', comSw === ComSWID.none ? null : comSw, 'equal')];
    this.fetchDataSource.next(this.queryObject);
  }

  clearFilter(): void {
    this.comswValue = ComSWID.none;
    this.clientListCompRef.resetSortAndFilters();
    this.queryObject.reset();
    this.fetchDataSource.next(this.queryObject);
  }

  onFilter(filterInput: HTMLInputElement): void {
    console.log(filterInput.value);
    const filterTerm = filterInput.value;
    this.queryObject.filter = [new FilterObject('comCompanyname', filterTerm, 'like')];
    this.fetchDataSource.next(this.queryObject);
  }

  onFilterParamChanged(queryObject: QueryParamObject): void {
    this.queryObject = queryObject;
    this.fetchDataSource.next(this.queryObject);
  }
}
