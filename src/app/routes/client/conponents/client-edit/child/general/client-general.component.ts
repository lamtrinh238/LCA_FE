import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import {
    ClientGroupModel,
    ClientGroupService,
    ClientModel,
    CountryModel,
    CountryService,
    EPDPCRModel,
    EpdpcrService,
    FilterObject,
    ProgramModuleModel,
    ProgramModuleService,
    QueryParamObject,
} from '@core';
import { ClientService } from 'src/app/core/domain/services/client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'lca-client-general',
    templateUrl: './client-general.component.html',
    styleUrls: ['./client-general.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientGeneralComponent implements OnInit {
    clientID: any;
    @Input() client$: ClientModel;

    formGroup: FormGroup;

    countries$: Observable<CountryModel[]>;
    epdpcrs$: Observable<EPDPCRModel[]>;
    programModules$: Observable<ProgramModuleModel[]>;
    clientGroups$: Observable<ClientGroupModel[]>;
    operators$: Observable<ClientModel[]>;
    private readonly fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
    fetchDataStart$ = this.fetchDataSource.asObservable();
    protected queryObject: QueryParamObject;

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

    loadingUpdate = false;

    constructor(
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private _clientService: ClientService,
        private _countryService: CountryService,
        private _clientGroupService: ClientGroupService,
        private _epdpcrService: EpdpcrService,
        private _programModuleService: ProgramModuleService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
    ) {
        this.queryObject = new QueryParamObject([], 1, 100, []);
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this._clientService.get(params.clientID).subscribe((c: ClientModel) => {
                this.clientID = params.clientID;
                this.client$ = c;
                this.formGroup.patchValue(this.client$);
                this.changeDetectorRef.detectChanges();

                this.countries$ = this.fetchDataStart$
                    .pipe(
                        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
                        switchMap(() => this._countryService.filter(this.queryObject)),
                        tap(),
                    )
                    .pipe();
                this.epdpcrs$ = this.fetchDataStart$
                    .pipe(
                        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
                        switchMap(() => this._epdpcrService.filter(this.queryObject)),
                        tap(),
                    )
                    .pipe();
                this.epdpcrs$.forEach((e) => {
                    e.map((i) => {
                        this.pcrOption.push({
                            label: i.pcrname,
                            value: i.id,
                            checked: this.client$?.comPCRLink?.find((pcr) => pcr.pcrId === i.id) ? true : false,
                        });
                    });
                    this.changeDetectorRef.detectChanges();
                });
                this.programModules$ = this.fetchDataStart$
                    .pipe(
                        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
                        switchMap(() => this._programModuleService.filter(this.queryObject)),
                        tap(),
                    )
                    .pipe();
                this.programModules$.forEach((e) => {
                    e.map((i) => {
                        this.applicationOption.push({
                            label: i.name,
                            value: i.id,
                            checked: this.client$?.comsws?.find((sw) => sw.swId === i.id) ? true : false,
                        });
                    });
                    this.changeDetectorRef.detectChanges();
                });
                this.clientGroups$ = this.fetchDataStart$
                    .pipe(
                        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
                        switchMap(() => this._clientGroupService.filter(this.queryObject)),
                        tap(),
                    )
                    .pipe();
                this.queryObject.filter.push(new FilterObject('ComType', 29, 'equal'));
                this.operators$ = this.fetchDataStart$
                    .pipe(
                        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
                        switchMap(() => this._clientService.filter(this.queryObject)),
                        tap(),
                    )
                    .pipe();
            });
        });

        this.fetchDataSource.next(this.queryObject);

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
            ComSws: [[], []],
            ComPcrs: [[], []],
        });
    }

    handleUpdate(): void {
        this.loadingUpdate = true;
        const comSws: any[] = [];
        const comPcrs: any[] = [];
        this.formGroup.value?.applicationOption.filter((a: any) => a.checked).map((a: any) => comSws.push(a.value));
        this.formGroup.value?.pcrOption.filter((a: any) => a.checked).map((a: any) => comPcrs.push(a.value));
        this.formGroup.value.ComSws = comSws;
        this.formGroup.value.ComPcrs = comPcrs;
        this._clientService
            .update(this.clientID, this.formGroup.value)
            .pipe(
                finalize(() => {
                    this.loadingUpdate = false;
                    this.changeDetectorRef.detectChanges();
                    this.router.navigate([`client`]);
                }),
            )
            .toPromise();
    }
}
