import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDataList, ClientModel, ColumnModel } from '@core';

@Component({
    selector: 'lca-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent extends BaseDataList<ClientModel> implements OnInit {
    @Output() openDelete = new EventEmitter<ClientModel>();
    constructor(changeDetectorRef: ChangeDetectorRef, private router: Router) {
        super(changeDetectorRef);
    }
    ngOnInit(): void {}

    goToDetail(id: number): void {
        this.router.navigate([`client/${id}`]);
    }

    onOpenDelete(client: ClientModel): void {
        this.openDelete.next(client);
    }

    resetSortAndFilters(): void {
        super.resetSortAndFilters();
        this._changeDetectorRef.detectChanges();
    }

    trackByName(index: number, item: ClientModel): number | undefined {
        return item.comId;
    }

    setupColumnModels(): ColumnModel[] {
        return [
            {
                title: 'Action',
                width: '100px',
            },
            {
                title: 'ID',
                width: '50px',
                sort: true,
                sortKey: 'comId',
            },
            {
                title: 'VAT',
                sort: true,
                sortKey: 'comCompanyvat',
            },
            {
                title: 'Name',
                sort: true,
                sortKey: 'comCompanyname',
            },
            {
                title: 'E-mail',
                sort: true,
                sortKey: 'comEmail',
            },
            {
                title: 'Address',
                sort: true,
                sortKey: 'comAdd',
            },
            {
                title: 'ZIP',
                width: '80px',
                sort: true,
                sortKey: 'comZip',
            },
            {
                title: 'City',
                sort: true,
                sortKey: 'comCity',
            },
            {
                title: 'Phone',
                sort: true,
                sortKey: 'comPhone1',
            },
            {
                title: 'Main contact',
                sort: true,
                sortKey: 'comMainContact',
            },
            {
                title: 'WEB',
                sort: true,
                sortKey: 'comWeb',
            },
            {
                title: 'Country',
                sort: true,
                sortKey: 'countryName',
            },
        ];
    }
}
