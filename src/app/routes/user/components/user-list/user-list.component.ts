import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserList } from 'src/app/models/user-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  tableData: UserList[] = [];

  listOfColumn = [
    {
      title: 'Action',
      with: '7px',
    },
    {
      title: 'ID',
      width: '5px',
    },
    {
      title: 'Name',
      width: '10px',
    },
    {
      title: 'Login Name',
      width: '17px',
    },
    {
      title: 'Email',
      width: '15px',
    },
    {
      title: 'Address',
      width: '15px',
    },
    {
      title: 'Zip',
      width: '7px',
    },
    {
      title: 'City',
      width: '10px',
    },
    {
      title: 'Phone',
      width: '10px',
    },
    {
      title: 'Internal Comments',
      width: '10px',
    },
  ];

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((data) => {
      this.tableData = data.tableData;
    });
  }
}
