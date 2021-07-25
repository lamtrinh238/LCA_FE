import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser, AuthenticationService, ClientModel, SessionService } from '@core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'lca-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.less'],
})
export class CompanySelectComponent implements OnInit {
  user: AuthenticatedUser;
  selectedCompany: number | undefined;
  companies: { comId: number; compName: string }[];
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.comId === o2.comId : o1 === o2);
  constructor(private sessionService: SessionService, private notification: NzNotificationService) {
    this.user = this.sessionService.authenticatedUserSnapshot;
    this.companies = this.user.companies?.map((c: ClientModel) => {
      return {
        comId: c.comId,
        compName: c.comCompanyname,
      };
    });

    const activeComp = this.user.getActiveCompany();
    this.selectedCompany = activeComp?.comId;
  }

  ngOnInit(): void {}

  onCompanySelected(comp: any): void {
    this.sessionService.setActiveCompany(comp);
    this.notification.success(`Congrats!`, 'You have switched company successfully.');
    this.sessionService.gotoHome();
  }
}
