import { ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientModel, ClientService } from '@core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lca-client-general',
  templateUrl: './client-general.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientGeneralComponent implements OnInit {
  @Input() client$: ClientModel;
  formGroup: FormGroup;
  private fetchDataSource = new BehaviorSubject<undefined>(undefined);
  fetchDataStart$ = this.fetchDataSource.asObservable();
  clientID: string;
  checked = true;
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private clientService: ClientService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clientID = params.clientID;
      this.clientService.get(params.clientID).subscribe((c: ClientModel) => {
        this.client$ = c;
        this.formGroup.patchValue(this.client$);
      });
    });

    this.formGroup = this._formBuilder.group({
      comCompanyvat: ['', []],
      comLogo: ['', []],
      comCompanyname: ['', [Validators.required]],
      comPhone1: ['', []],
      comPhone2: ['', []],
      comPhone3: ['', []],
      comAdd: ['', []],
      comZip: ['', []],
      comMainContact: ['', []],
      comCity: ['', []],
      comEmail: ['', []],
      comCountry: ['', []],
      comWeb: ['', []],
      comStatus: [false],
      comCreatedttm: ['', []],
      comGuid: [{ disabled: true, value: '' }],
      comToken: ['', []],
      comPageText: ['', []],
      comManagmentSys: ['', []],
      comEpdinfo1: ['', []],
      comEpdinfo2: ['', []],
      comEpdinfo3: ['', []],
      comEpdinfo4: ['', []],
      comPaidTo: ['', []],
      comType: [1, []],
      comModulSubFase: [0],
      comModulSharing: [0],
    });
  }
}
