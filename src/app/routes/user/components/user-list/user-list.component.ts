import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserListService } from '../../services/user-list.service';
import { UserList } from 'src/app/models/user-list';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  tableData = [];
  userData: any;

  listOfColumn = [
    {
      title: 'Action',
      priority: 1,
      with: '10px',
    },
    {
      title: 'ID',
      compare: null,
      width: '50px',
    },
    {
      title: 'Name',
      priority: 2,
    },
    {
      title: 'Login Name',
      priority: 1,
      width: '80px',
    },
    {
      title: 'Email',
      priority: 1,
      width: '80px',
    },
    {
      title: 'Address',
      priority: 1,
    },
    {
      title: 'Zip',
      priority: 1,
    },
    {
      title: 'City',
      priority: 1,
    },
    {
      title: 'Phone',
      priority: 1,
    },
    {
      title: 'Internal Comments',
      priority: 1,
      width: '20%',
    },
  ];
  links = [
    'EPD in work',
    'Archive',
    'EPD for BIM',
    'Internal calculation (MF 2)',
    'EPD list (MF 3)',
    'Copy from module (MF 4)',
    'Cement calculation (MF 5)',
    'Copy from A1-A3 (MF 6)',
    'EPDs transferred to you',
  ];

  selectedEpdType: string;

  constructor(private listService: UserListService) { }

  ngOnInit(): void {
    this.listService.getUserList().subscribe(
      (data) => {
        this.tableData = data.companies;
      }
    );
  }
}
