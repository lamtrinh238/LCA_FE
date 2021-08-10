import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BaseDataList,
  ClientModel,
  ClientService,
  ComSWID,
  FilterObject,
  QueryParamObject,
} from '@core';
import { _HttpClient } from '@delon/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { exhaustMap, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ClientListComponent } from '../conponents/client-list/client-list.component';
import { ClientFilterModel } from '../models/client-filter-model';

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

  @ViewChild('clientListComp', { read: ClientListComponent })
  clientListCompRef: ClientListComponent;
  comswValue = ComSWID.All;
  ComSWID = ComSWID;

  filterModel: ClientFilterModel;

  constructor(private clientService: ClientService) {
    this.filterModel = new ClientFilterModel();
  }

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
    this.queryObject.clear();
    this.queryObject.filter = this.filterModel.toFilterObjects();
    this.fetchDataSource.next(this.queryObject);
  }

  clearFilter(): void {
    this.filterModel.clear();
    this.queryObject.clear();
    this.clientListCompRef.resetSortAndFilters();
    this.fetchDataSource.next(this.queryObject);
  }

  onFilter(): void {
    this.queryObject.filter = this.filterModel.toFilterObjects();
    this.fetchDataSource.next(this.queryObject);
  }

  onFilterParamChanged(queryObject: QueryParamObject): void {
    this.queryObject = queryObject;
    this.queryObject.filter.push(...this.filterModel.toFilterObjects());
    this.fetchDataSource.next(this.queryObject);
  }
}
