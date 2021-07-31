import { ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BaseDataList, ColumnModel, UserModel } from '@core';

@Component({
  selector: 'lca-client-user',
  templateUrl: './client-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientUserComponent extends BaseDataList<UserModel> implements OnInit {
  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngOnInit(): void {}

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
