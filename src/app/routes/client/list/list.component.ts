import { HttpParams } from '@angular/common/http';
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
  sortField = 'ComID';
  sortOrder = 'asc';
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
    _filter: Array<{ key: string; value: string[] }>,
  ): void {
    this.loading = true;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    if (sortField) {
      this.sortField = sortField || 'ComID';
      this.sortOrder = sortOrder || '';
    }
    const params = new HttpParams()
      .append('SortText', `${this.sortField}.${sortOrder === 'descend' ? 'DESC' : 'ASC'}`)
      .append('FilterText', `ComSW[0]${this.comswValue}`)
      .append('PageSize', String(pageSize))
      .append('Page', String(pageIndex));
    this.clientService.getListClient(this.currentUser.token, params).subscribe((clients: Client[]) => {
      this.loading = false;
      this.clients = clients as Client[];
      this.total =
        clients.length >= this.pageSize
          ? clients.length + this.pageSize * this.pageIndex
          : clients.length + this.pageSize * (this.pageIndex - 1);
      this.cdr.detectChanges();
    });
  }

  onEnterSearch(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);
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
    this.pageIndex = 1;
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);
  }

  clearFilter(): void {
    this.comswValue = '1';
    this.searchValue = '';
    this.pageSize = 10;
    this.pageIndex = 1;
    this.total = 1;
    this.sortField = 'ComID';
    this.sortOrder = 'asc';
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);
  }
}
