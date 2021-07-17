import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDataList, ColumnModel, FilterObject, QueryParamObject, SortObject, UserModel } from '@core';
import { UserInfo } from 'os';

@Component({
  selector: 'lca-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent extends BaseDataList implements OnInit {
  @Input() data: UserModel[];

  listOfColumn: ColumnModel[] = [
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

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onViewUserDetail(user: UserModel): void {}

  trackByName(index: number, item: UserModel): number | undefined {
    return item.usrId;
  }
}
