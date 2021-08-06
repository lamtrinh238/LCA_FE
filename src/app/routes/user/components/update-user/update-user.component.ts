import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService, QueryParamObject, UserModel, UserService } from '@core';
import keys from 'lodash/keys';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
    selector: 'lca-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
    private searchChange$ = new BehaviorSubject('');
    queryObject: QueryParamObject;
    formGroup: FormGroup;
    @Input() data: UserModel;
    listOfCurrentPageData: any = [];
    UserComLinks: UserModel[] = [];
    isLoading = false;
    optionList: string[] = [];
    constructor(
        private _formBuilder: FormBuilder,
        private _nzModalService: NzModalService,
        private _userService: UserService,
        private _clientService: ClientService,
    ) {
        this.queryObject = new QueryParamObject([], 1, 100, []);
    }

    listOfColumns = [
        {
            title: 'ID',
            width: '5px',
        },
        {
            title: 'Company',
            width: '20px',
        },
        {
            title: 'Role',
            width: '5px',
        },
        {
            title: 'Edit',
            width: '3px',
        },
    ];

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

        this.formGroup.patchValue(this.data);
        this.getCompanyLinks().subscribe((comlink) => {
            this.isLoading = true;
            // @ts-ignore
            this.UserComLinks = comlink.companies;
            this.isLoading = false;
        });
        this.getCompanylist().subscribe((com) => (this.optionList = com));

        const optionList$: Observable<string[]> = this.searchChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(this.getCompanylist));
        optionList$.subscribe((data) => {
            this.optionList = data;
        });
    }

    onSearch(value: string): void {
        this.searchChange$.next(value);
    }

    getCompanyLinks(): Observable<UserModel> {
        return this._userService.get(this.data.usrId!);
    }

    getCompanylist(): Observable<any> {
        return this._userService.filter(this.queryObject);
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

    onCurrentPageDataChange($event: UserModel[]): void {
        this.listOfCurrentPageData = $event;
    }
}
