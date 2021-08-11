import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService, CompanyModel, FilterObject, QueryParamObject, RoleModel, UserModel, UserComLinkModel } from '@core';
import { keys } from 'lodash';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ROLEMASTERDATA } from '_mock';

@Component({
    selector: 'lca-add-on-company',
    templateUrl: './add-on-company.component.html',
    styleUrls: ['./add-on-company.component.less']
})
export class AddOnCompanyComponent implements OnInit {

    @Input() data: UserModel;
    protected queryObject: QueryParamObject;
    isLoading = false;
    searchChange$ = new BehaviorSubject('');

    listCompany: CompanyModel[] = [];
    listRole: RoleModel[] = [];
    companyFormGroup: FormGroup;
    constructor(
        private clientService: ClientService,
        private formBuider: FormBuilder
    ) {
        this.queryObject = new QueryParamObject([], 1, 100, []);
        this.listRole = ROLEMASTERDATA;
    }
    ngOnInit(): void {
        this.initForm();
        this.loadCompanyFilter();
    }
    initForm(): void {
        this.companyFormGroup = this.formBuider.group(
            {
                usrId: [this.data.usrId],
                comId: ['', [Validators.required]],
                usrType: ['', [Validators.required]]
            }
        );
    }
    onSearch($event: string): void {
        this.isLoading = true;
        this.searchChange$.next($event);
    }
    loadCompanyFilter(): void {
        const listCompany$: Observable<CompanyModel[]> = this.searchChange$
            .asObservable()
            .pipe(
                debounceTime(500),
                tap((res) => {
                    if (res != '') {
                        this.queryObject.filter.push(new FilterObject('filterText', res, 'equal'));
                    }
                }),
                switchMap((res) => {
                    return this.getCompanylist(this.queryObject);
                }),
            );

        listCompany$.subscribe(
            {
                next: (res) => {
                    this.isLoading = false;
                    this.listCompany = res;
                },
                error: (err) => {
                    // TODO
                }
            }
        );
    }

    getCompanylist(filterValue: QueryParamObject): Observable<any> {
        return this.clientService.filter(filterValue);
    }

    showError(): void {
        keys(this.companyFormGroup.controls).forEach((key: string) => {
            this.companyFormGroup.controls[key].markAsTouched();
            this.companyFormGroup.controls[key].updateValueAndValidity();
        });
    }


}
