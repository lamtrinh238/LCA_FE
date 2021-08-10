import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDataList, ClientModel, ColumnModel } from '@core';

@Component({
  selector: 'lca-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent extends BaseDataList<ClientModel> implements OnInit {
  constructor(changeDetectorRef: ChangeDetectorRef, private router: Router) {
    super(changeDetectorRef);
  }
  ngOnInit(): void {}

  goToDetail(id: number): void {
    this.router.navigate([`client/${id}`]);
  }

  resetSortAndFilters(): void {
    super.resetSortAndFilters();
    this._changeDetectorRef.detectChanges();
  }

  trackByName(index: number, item: ClientModel): number | undefined {
    return item.comId;
  }

  setupColumnModels(): ColumnModel[] {
    return [
      {
        title: 'Action',
        width: '50px',
      },
      {
        title: 'ID',
        width: '50px',
        sortKey: 'comId',
      },
      {
        title: 'VAT',
        sort: true,
        sortKey: 'comCompanyvat',
      },
      {
        title: 'Name',
        sortKey: 'comCompanyname',
      },
      {
        title: 'E-mail',
        sortKey: 'comEmail',
      },
      {
        title: 'Address',
        sortKey: 'comAdd',
      },
      {
        title: 'ZIP',
        width: '80px',
        sortKey: 'comZip',
      },
      {
        title: 'City',
        sortKey: 'comCity',
      },
      {
        title: 'Phone',
        sortKey: 'comPhone1',
      },
      {
        title: 'Main contact',
        sortKey: 'comMainContact',
      },
      {
        title: 'WEB',
        sortKey: 'comWeb',
      },
      {
        title: 'Country',
        sortKey: 'countryName',
      },
    ];
  }
}
