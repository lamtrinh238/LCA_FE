import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'lca-client-general',
  templateUrl: './client-general.component.html',
  styleUrls: ['./client-general.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientGeneralComponent implements OnInit {
  @Input() client$: ClientModel;
  countries$: CountryModel[];
  epdpcrs$: EPDPCRModel[];
  programModules$: ProgramModuleModel[];
  clientGroups$: ClientGroupModel[];
  operators$: ClientModel[];

  formGroup: FormGroup;

  applicationOption: {
    label: string;
    value: number;
    checked: boolean;
  }[] = [];
  pcrOption: {
    label: string;
    value: number;
    checked: boolean;
  }[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private countryService: CountryService,
    private clientGroupService: ClientGroupService,
    private epdpcrService: EpdpcrService,
    private programModuleService: ProgramModuleService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clientService.get(params.clientID).subscribe((c: ClientModel) => {
        this.client$ = c;
        this.formGroup.patchValue(this.client$);
        this.changeDetectorRef.detectChanges();
      });
      const baseParams = { pageSize: 100, filterText: '' };
      this.countryService.getList(baseParams).subscribe((cs: CountryModel[]) => {
        this.countries$ = cs;
        this.changeDetectorRef.detectChanges();
      });
      this.clientGroupService.getList(baseParams).subscribe((cs: ClientGroupModel[]) => {
        this.clientGroups$ = cs;
        this.changeDetectorRef.detectChanges();
      });
      this.epdpcrService.getList(baseParams).subscribe((cs: EPDPCRModel[]) => {
        this.epdpcrs$ = cs;
        cs.map((c) => {
          this.pcrOption.push({
            label: c.pcrname,
            value: c.id,
            checked: this.client$.comPCRLink.find((pcr) => pcr.pcrId === c.id) ? true : false,
          });
        });
        this.changeDetectorRef.detectChanges();
      });
      this.programModuleService.getList(baseParams).subscribe((cs: ProgramModuleModel[]) => {
        this.programModules$ = cs;
        cs.map((c) => {
          this.applicationOption.push({
            label: c.name,
            value: c.id,
            checked: this.client$.comsws.find((csw) => csw.swId === c.id) ? true : false,
          });
        });
        this.changeDetectorRef.detectChanges();
      });
      baseParams.filterText = 'ComType[equal]29';
      this.clientService.getList(baseParams).subscribe((cs: ClientModel[]) => {
        this.operators$ = cs;
        this.changeDetectorRef.detectChanges();
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
      comProgramOperator: [1, []],
      comModulSubFase: [0],
      comModulSharing: [0],
      applicationOption: [this.applicationOption],
      pcrOption: [this.pcrOption],
    });
  }
}
