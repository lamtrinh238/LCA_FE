import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseDataList, ColumnModel, UserModel } from '@core';

@Component({
    selector: 'lca-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent extends BaseDataList<UserModel> implements OnInit {
    @Output() openUpdateUser = new EventEmitter<UserModel>();
    @Output() openUserDetail = new EventEmitter<UserModel>();
    constructor(changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    ngOnInit(): void {
    }

    onOpenView(user: UserModel): void {
        this.openUserDetail.next(user);
    }
    onOpenEdit(user: UserModel): void {
        this.openUpdateUser.next(user);
    }

    trackByName(index: number, item: UserModel): number | undefined {
        return item.usrId;
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
                sortKey: 'usrId',
            },
            {
                title: 'Name',
                width: '250px',
                sort: true,
                sortKey: 'usrFullname',
            },
            {
                title: 'Login Name',
                sort: true,
                width: '200px',
                sortKey: 'usrLoginname',
            },
            {
                title: 'Email',
                sort: true,
                width: '200px',
                sortKey: 'usrEmail',
            },
            {
                title: 'Address',
                sort: true,
                width: '250px',
                sortKey: 'usrAdd',
            },
            {
                title: 'Zip',
                sort: true,
                width: '20px',
                sortKey: 'usrZip',
            },
            {
                title: 'City',
                sort: true,
                width: '20px',
                sortKey: 'usrCity',
            },
            {
                title: 'Phone',
                sort: true,
                width: '200px',
                sortKey: 'usrPhone1',
            },
            {
                title: 'Internal Comments',
                width: '20%',
            },
        ];
    }
}
