import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ClientModel } from '@core';
import { Observable } from 'rxjs';

@Component({
  selector: 'lca-create-company-link',
  templateUrl: './create-company-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyLinkComponent implements OnInit {
  @Input() clients: Observable<ClientModel[]>;
  ngOnInit(): void {}
}
