import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
  ClientGroupModel,
  ClientGroupService,
  ClientModel,
  ClientService,
  CountryModel,
  CountryService,
  EPDPCRModel,
  EpdpcrService,
  ProgramModuleModel,
  ProgramModuleService,
} from '@core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lca-client-general',
  templateUrl: './client-general.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientGeneralComponent implements OnInit {
  @Input() client$: ClientModel;
  countries$: CountryModel[];
  epdpcrs$: EPDPCRModel[];
  programModules$: ProgramModuleModel[];
  clientGroups$: ClientGroupModel[];
  baseParams = new HttpParams();
  formGroup: FormGroup;
  private fetchDataSource = new BehaviorSubject<undefined>(undefined);
  fetchDataStart$ = this.fetchDataSource.asObservable();
  clientID: string;
  checked = true;
  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private countryService: CountryService,
    private clientGroupService: ClientGroupService,
    private epdpcrService: EpdpcrService,
    private programModuleService: ProgramModuleService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clientID = params.clientID;
      this.clientService.get(params.clientID).subscribe((c: ClientModel) => {
        this.client$ = c;
        this.formGroup.patchValue(this.client$);
      });
      this.baseParams.set('Pagesize', '100');
      this.countryService.getList(this.baseParams).subscribe((cs: CountryModel[]) => {
        this.countries$ = cs;
      });
      this.clientGroupService.getList(this.baseParams).subscribe((cs: ClientGroupModel[]) => {
        this.clientGroups$ = cs;
      });
      this.epdpcrService.getList(this.baseParams).subscribe((cs: EPDPCRModel[]) => {
        this.epdpcrs$ = cs;
      });
      this.programModuleService.getList(this.baseParams).subscribe((cs: ProgramModuleModel[]) => {
        this.programModules$ = cs;
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
      comCountry: [1],
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
