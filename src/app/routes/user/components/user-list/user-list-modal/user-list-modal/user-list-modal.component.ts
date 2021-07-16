import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserList } from 'src/app/models/user-list';

@Component({
  selector: 'app-user-list-modal',
  templateUrl: './user-list-modal.component.html',
  styleUrls: ['./user-list-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListModalComponent {
  @Input() userDetailInfo: UserList[] = [];

  listOfModalColumn = [
    {
      title: 'Roles',
      with: '7px',
    },
    {
      title: 'User Type',
      width: '5px',
    },
    {
      title: 'User Phone 2',
      width: '10px',
    },
    {
      title: 'User Status',
      width: '17px',
    },
    {
      title: 'User Created TTM',
      width: '15px',
    },
    {
      title: 'Created by',
      width: '15px',
    },
    {
      title: 'User Organization',
      width: '7px',
    },
    {
      title: 'User Training date',
      width: '10px',
    },
    {
      title: 'User Valid date',
      width: '10px',
    },
    {
      title: 'User GDPR',
      width: '10px',
    },
    {
      title: 'Last Login',
      width: '10px',
    },
    {
      title: 'User GUID',
      with: '10px',
    },
    {
      title: 'Active Status',
      width: '10px',
    },
    {
      title: 'Approve Status',
      width: '10px',
    },
  ];
  isVisible = false;

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
