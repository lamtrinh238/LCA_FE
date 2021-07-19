import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lca-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less'],
})
export class UserDetailComponent {
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
