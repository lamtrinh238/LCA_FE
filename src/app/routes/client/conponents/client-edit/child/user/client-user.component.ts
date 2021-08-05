import { ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BaseDataList, ColumnModel, QueryParamObject, UserModel, UserService } from '@core';
import { delay, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserFilterModel } from 'src/app/routes/user/user-filter-model';
import { environment } from '@env/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'lca-client-user',
    templateUrl: './client-user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientUserComponent extends BaseDataList<UserModel> implements OnInit {
    clientUsers$: Observable<UserModel[]>;
    private readonly fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
    fetchDataStart$ = this.fetchDataSource.asObservable();
    isFiltering = false;
    protected queryObject: QueryParamObject;
    filterModel: UserFilterModel;

    constructor(
        private route: ActivatedRoute,
        changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
    ) {
        super(changeDetectorRef);
        this.filterModel = new UserFilterModel();
        this.queryObject = new QueryParamObject([], 1, 100, []);
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.clientUsers$ = this.fetchDataStart$
                .pipe(
                    filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
                    tap(() => (this.isFiltering = true)),
                    switchMap(() => this._userService.getList(this.queryObject, `/clients/${params.clientID}`)),
                    tap(() => (this.isFiltering = false)),
                )
                .pipe(
                    finalize(() => {
                        this.isFiltering = false;
                    }),
                );
            this.fetchDataSource.next(this.queryObject);
        });
    }

    handleUpdate(): void {}

    setupColumnModels(): ColumnModel[] {
        return [
            {
                title: 'ID',
            },
            {
                title: 'Type',
            },
            {
                title: 'Name',
            },
            {
                title: 'e-mail',
            },
            {
                title: 'Phone 1',
            },
            {
                title: 'Phone 2',
            },
            {
                title: 'Created',
            },
            {
                title: 'Training',
            },
            {
                title: 'Valid to',
            },
            {
                title: 'Active',
            },
        ];
    }
}
