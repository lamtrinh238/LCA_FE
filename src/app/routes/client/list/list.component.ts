import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  loading = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '');

  constructor(private clientService: ClientService) {}

  listOfColumn = [
    {
      title: 'ID',
      compare: null,
      width: '50px',
    },
    {
      title: 'VAT',
      priority: 3,
    },
    {
      title: 'Name',
      priority: 2,
    },
    {
      title: 'E-mail',
      priority: 1,
    },
    {
      title: 'Adress',
      priority: 1,
    },
    {
      title: 'ZIP',
      priority: 1,
      width: '80px',
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
      title: 'Main contact',
      priority: 1,
    },
    {
      title: 'WEB',
      priority: 1,
    },
    {
      title: 'Country',
      priority: 1,
    },
  ];

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>,
  ): void {
    this.loading = false;
    const search = `?PageSize=${pageSize}&Page=${pageIndex}`;
    this.clientService.getListClient(this.currentUser.token, search).subscribe((clients: Client[]) => {
      this.loading = true;
      this.clients = clients;
      this.total = 100;
    });
    this.clientService.getCountClient(this.currentUser.token).subscribe((count: number) => {
      this.total = count;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  ngOnInit(): void {
    this.loadDataFromServer(1, 10, '', '', []);
  }
}
