import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseDataList, ColumnModel, CompanyModel } from '@core';

@Component({
    selector: 'lca-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListComponent extends BaseDataList<CompanyModel> implements OnInit, OnChanges {
    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }
    ngOnChanges(changes: SimpleChanges): void {}
    ngOnInit(): void {}
    setupColumnModels(): ColumnModel[] {
        return [
            {
                title: 'ID',
                width: '5px',
            },
            {
                title: 'Company',
                width: '20px',
            },
            {
                title: 'Role',
                width: '5px',
            },
            {
                title: 'Edit',
                width: '3px',
            },
        ];
    }
}
