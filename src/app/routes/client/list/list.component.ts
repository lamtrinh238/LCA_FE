import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-dashboard-workplace',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  comswValue = '1';
  searchValue = '';
  pageSize = 10;
  pageIndex = 1;
  total = 1;
  loading = true;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '');

  constructor(private clientService: ClientService, private cdr: ChangeDetectorRef) {}

  listOfColumn = [
    {
      title: 'ID',
      compare: null,
      width: '50px',
      columnKey: 'ID',
    },
    {
      title: 'VAT',
      priority: 3,
      columnKey: 'VAT',
    },
    {
      title: 'Name',
      priority: 2,
      columnKey: 'Name',
    },
    {
      title: 'E-mail',
      priority: 1,
      columnKey: 'Email',
    },
    {
      title: 'Address',
      priority: 1,
      columnKey: 'Address',
    },
    {
      title: 'ZIP',
      priority: 1,
      width: '80px',
      columnKey: 'Zip',
    },
    {
      title: 'City',
      priority: 1,
      columnKey: 'City',
    },
    {
      title: 'Phone',
      priority: 1,
      columnKey: 'Phone',
    },
    {
      title: 'Main contact',
      priority: 1,
      columnKey: 'MainContact',
    },
    {
      title: 'WEB',
      priority: 1,
      columnKey: 'Web',
    },
    {
      title: 'Country',
      priority: 1,
      columnKey: 'Country',
    },
  ];

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>,
  ): void {
    this.loading = true;
    let search = `?PageSize=${pageSize}&Page=${pageIndex}`;
    if (sortField) {
      search += `&sort=${sortField}.${sortOrder === 'descend' ? 'desc' : 'asc'}`;
    }
    search += `&ComSW=${this.comswValue}`;
    // if (filter) {
    //   filter.map((f) => {
    //     search += `&${f.key}=${f.value[0]}`
    //   });
    // }
    this.clientService.getListClient(this.currentUser.token, search).subscribe((clients: Client[]) => {
      this.loading = false;
      this.clients = clients;
      this.total = 100;
      this.cdr.detectChanges();
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  onChangeComSW(comSw: string): void {
    this.comswValue = comSw;
    this.loadDataFromServer(this.pageIndex, this.pageSize, '', '', []);
  }

  ngOnInit(): void {
    this.loadDataFromServer(1, 10, '', '', []);
  }
}
