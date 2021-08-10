import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService, CompanyModel, QueryParamObject, UserModel, UserService } from '@core';
import keys from 'lodash/keys';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'lca-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
    queryObject: QueryParamObject;
    formGroup: FormGroup;
    @Input() dataUser: UserModel;
    isLoadingFilter = false;

    selectedUser?: any;

    listCompany: any;

    usercompLink$: Observable<CompanyModel[] | any>;

    searchChange$ = new BehaviorSubject('');

    private readonly fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
    fetchDataStart$ = this.fetchDataSource.asObservable();

    constructor(
        private http: HttpClient,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _clientService: ClientService
    ) {
        this.queryObject = new QueryParamObject([], 1, 100, []);
    }

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            usrLoginname: ['', [Validators.required]],
            usrEmail: ['', [Validators.email, Validators.required]],
            usrFullname: ['', [Validators.required]],
            usrAdd: ['', [Validators.required]],
            usrZip: ['', [Validators.required]],
            usrCity: ['', [Validators.required]],
            usrPhone1: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
            // password: ['', [Validators.required]],
            usrComments: [''],
        });

        this.formGroup.patchValue(this.dataUser);

        // this._userService.get(this.dataUser.usrId!).subscribe({
        //     next: (comlink) => {
        //         debugger
        //         this.userComLinks = comlink.companies
        //     },
        // });

        this.loadUserCompany();
    }

    // onSearch($event: string): void {
    //     this.isLoadingFilter = true;
    //     this.searchChange$.next($event);
    // }

    // loadCompanyFilter(): void {
    //     const listCompany$: Observable<string[]> = this.searchChange$
    //         .asObservable()
    //         .pipe(
    //             debounceTime(500),
    //             tap((res) => {
    //                 if (res != '') {
    //                     this.queryObject.filter.push(new FilterObject('filterText', res, 'equal'));
    //                 }
    //             }),
    //             switchMap((res) => {
    //                 return this.getCompanylist(this.queryObject);
    //             }),
    //         );

    //     listCompany$.subscribe(
    //         {
    //             next: (res) => {
    //                 this.isLoadingFilter = false;
    //                 this.listCompany = res;
    //             },
    //             error: (err) => {
    //                 // TODO
    //             }
    //         }
    //     );
    // }

    loadUserCompany(): void {
        this.usercompLink$ = this.fetchDataStart$
            .pipe(
                tap(() => (this.isLoadingFilter = true)),
                switchMap(() => this._userService.get(this.dataUser.usrId!)),
                map((res) => res.companies),
                tap(() => (this.isLoadingFilter = false)),
                finalize(() => {
                    this.isLoadingFilter = false;
                })
            )

    }

    getCompanylist(filterValue: QueryParamObject): Observable<any> {
        return this._clientService.filter(filterValue);
    }

    submitForm(value: unknown): void {
        console.log(value);
    }
    showError(): void {
        keys(this.formGroup.controls).forEach((key: string) => {
            this.formGroup.controls[key].markAsTouched();
            this.formGroup.controls[key].updateValueAndValidity();
        });
    }

    onClickSave(): void {
        const headers = {
            'Content-Type': 'application/json',
            mode: 'no-cors',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
        };
        const body = {
            id: null,
            usrId: this.dataUser.usrId,
            comId: this.selectedUser[0].comId,
            usrType: null,
        };
        this.http
            .post('localhost:44302/api/UserCompLink/usercompLink', body, { headers })
            .subscribe((user) => console.log(user));
    }
}
