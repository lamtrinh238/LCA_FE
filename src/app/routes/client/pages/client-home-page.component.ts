import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseDataList, ClientModel, ClientService, ComSWID, CountryModel, CountryService, QueryParamObject } from '@core';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, exhaustMap, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ClientCreateComponent } from '../conponents/client-create/client-create.component';
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

  @ViewChild('clientListComp', { read: ClientListComponent }) clientListCompRef: ClientListComponent;
  comswValue = ComSWID.eEPD;
  ComSWID = ComSWID;

  filterModel: ClientFilterModel;

  countries$: CountryModel[];
  protected clientQueryObject: QueryParamObject;

  constructor(private clientService: ClientService, private _nzModalService: NzModalService, private _countryService: CountryService) {
    this.filterModel = new ClientFilterModel();
    this.clientQueryObject = new QueryParamObject([], 1, 100, []);
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

    this._countryService
      .filter(this.clientQueryObject)
      .pipe()
      .subscribe((c: CountryModel[]) => (this.countries$ = c));
  }

  onOpenAddClient(): void {
    this._nzModalService.create({
      nzComponentParams: {
        countries: this.countries$,
        comSW: this.comswValue,
      },
      nzTitle: 'Create Client',
      nzOkText: 'Save',
      nzWidth: 1024,
      nzContent: ClientCreateComponent,
      nzClosable: false,
      nzMaskClosable: false,
      nzOnOk: (contentComponentInstance?: ClientCreateComponent) => {
        console.log(contentComponentInstance);
        if (contentComponentInstance?.formGroup.valid) {
          return this.clientService
            .add(contentComponentInstance?.formGroup.value)
            .pipe(
              tap(() => this.fetchDataSource.next(this.queryObject)),
              delay(1000), // TODO: to test loading indicator.
            )
            .toPromise();
        } else {
          contentComponentInstance?.showError();
          return false;
        }
      },
    });
  }

  onChangeComSW(comSw: ComSWID): void {
    this.queryObject.clear();
    this.queryObject.filter = this.filterModel.toFilterObjects();
    this.fetchDataSource.next(this.queryObject);
    this.comswValue = comSw;
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
