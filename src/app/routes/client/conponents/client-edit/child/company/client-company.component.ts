import { ChangeDetectorRef, Component } from '@angular/core';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseDataList, ClientModel, ClientService, ColumnModel, FilterObject, QueryParamObject } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { ClientFilterModel } from 'src/app/routes/client/models/client-filter-model';
import { CreateCompanyLinkComponent } from './create/create-company-link.component';

@Component({
    selector: 'lca-client-company',
    templateUrl: './client-company.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCompanyComponent extends BaseDataList<ClientModel> implements OnInit {
    companies$: Observable<ClientModel[]>;
    clients$: Observable<ClientModel[]>;
    private readonly fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
    fetchDataStart$ = this.fetchDataSource.asObservable();
    protected queryObject: QueryParamObject;
    isLoading = false;
    selectedCompanyType = 1;
    filterModel: ClientFilterModel;
    thisClientID = 0;

    companyType = [
        {
            value: 1,
            title: 'Members',
        },
        {
            value: 2,
            title: 'Manufacturer',
        },
        {
            value: 3,
            title: 'Productionsite',
        },
    ];

    constructor(
        private route: ActivatedRoute,
        changeDetectorRef: ChangeDetectorRef,
        private _clientService: ClientService,
        private _nzModalService: NzModalService,
    ) {
        super(changeDetectorRef);
        this.queryObject = new QueryParamObject([], 1, 100, []);
    }

    ngOnInit(): void {
        this.queryObject.filter.push(new FilterObject('linkType', this.selectedCompanyType, 'equal'));
        this.route.params.subscribe((params: Params) => {
            this.thisClientID = params.clientID;
            this.companies$ = this.fetchDataStart$.pipe(
                filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
                tap(() => (this.isLoading = true)),
                switchMap(() => this._clientService.getCompanies(this.queryObject, params.clientID)),
                tap(() => (this.isLoading = false)),
            );
            this.fetchDataSource.next(this.queryObject);
        });
    }

    onCompanyTypeChange(e: number): void {
        this.selectedCompanyType = e;
        this.queryObject.clear();
        this.queryObject.filter.push(new FilterObject('linkType', e, 'equal'));
        this.fetchDataSource.next(this.queryObject);
    }

    onFilterParamChanged(queryObject: QueryParamObject): void {
        this.queryObject = queryObject;
        this.queryObject.filter.push(...this.filterModel.toFilterObjects());
        this.fetchDataSource.next(this.queryObject);
    }

    onOpenAddComLink(): void {
        this._nzModalService.create({
            nzTitle: 'Create Client',
            nzOkText: 'Save',
            nzWidth: 1024,
            nzContent: CreateCompanyLinkComponent,
            nzClosable: false,
            nzMaskClosable: false,
            nzOnOk: (contentComponentInstance?: CreateCompanyLinkComponent) => {
                const param = {
                    comId: this.thisClientID as number,
                    linkId: contentComponentInstance?.selectedValue,
                    type: this.selectedCompanyType,
                };
                if (contentComponentInstance?.selectedValue) {
                    return this._clientService
                        .addComLink(param)
                        .pipe(
                            tap(() => this.fetchDataSource.next(this.queryObject)),
                            delay(1000), // TODO: to test loading indicator.
                        )
                        .toPromise();
                } else {
                    return false;
                }
            },
        });
    }

    setupColumnModels(): ColumnModel[] {
        return [
            {
                title: 'ID',
            },
            {
                title: 'VAT',
            },
            {
                title: 'Name',
            },
            {
                title: 'e-mail',
            },
            {
                title: 'Address',
            },
            {
                title: 'Zip code',
            },
            {
                title: 'City',
            },
            {
                title: 'Phone',
            },
            {
                title: 'Type',
            },
        ];
    }
}
