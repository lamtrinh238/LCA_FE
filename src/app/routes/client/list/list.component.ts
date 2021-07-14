import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
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
  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.clientService
      .getListClient(currentUser.token)
      .pipe()
      .subscribe((clients: Client[]) => {
        this.clients = clients;
      });
  }
}
