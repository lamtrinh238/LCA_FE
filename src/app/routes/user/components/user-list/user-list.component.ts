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

  ngOnInit(): void {}

  onOpenView(user: UserModel): void {
    this.openUserDetail.next(user);
  }
  onOpenEdit(user: UserModel): void {
    console.log(user);
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
        width: '200px',
      },
      {
        title: 'Email',
        width: '200px',
      },
      {
        title: 'Address',
        width: '250px',
      },
      {
        title: 'Zip',
        width: '20px',
      },
      {
        title: 'City',
        width: '20px',
      },
      {
        title: 'Phone',
        width: '200px',
      },
      {
        title: 'Internal Comments',
        width: '20%',
      },
    ];
  }
}
