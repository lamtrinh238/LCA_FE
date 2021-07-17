import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '@core';
import { UserInfo } from 'os';

@Component({
  selector: 'lca-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @Input() data: UserModel[];
  @Input() isLoading: boolean;

  listOfColumn = [
    {
      title: 'Action',
      width: '100px',
    },
    {
      title: 'ID',
      width: '50px',
    },
    {
      title: 'Name',
      width: '250px',
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
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onViewUserDetail(user: UserModel): void {}
}
