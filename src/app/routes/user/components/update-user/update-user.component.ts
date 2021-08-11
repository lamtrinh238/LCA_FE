import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyModel, QueryParamObject, UserModel, UserService } from '@core';
import keys from 'lodash/keys';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, finalize, map, switchMap, tap } from 'rxjs/operators';
import { UserComLinkService } from 'src/app/core/domain/services/user-com-link.service';
import { NOTIFYMESSAGE } from '_mock';
import { AddOnCompanyComponent } from '../add-on-company/add-on-company.component';

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

    usercompLink$: Observable<CompanyModel[] | any>;

    private readonly fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
    fetchDataStart$ = this.fetchDataSource.asObservable();

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _userComLinkService: UserComLinkService,
        private _nzModalService: NzModalService,
        private notify: NzNotificationService
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
        this.loadUserCompany();
    }

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

    submitForm(value: unknown): void {
        console.log(value);
    }
    showError(): void {
        keys(this.formGroup.controls).forEach((key: string) => {
            this.formGroup.controls[key].markAsTouched();
            this.formGroup.controls[key].updateValueAndValidity();
        });
    }

    onAddCompany(): void {
        this._nzModalService.create<AddOnCompanyComponent, UserModel>({
            nzComponentParams: {
                data: this.dataUser,
            },
            nzTitle: 'Add On New Company',
            nzOkText: 'Save',
            nzWidth: 450,
            nzContent: AddOnCompanyComponent,
            nzClosable: false,
            nzMaskClosable: false,
            nzOnOk: (contentComponentInstance?: AddOnCompanyComponent) => {
                if (contentComponentInstance?.companyFormGroup.valid) {
                    return this._userComLinkService
                        .add(contentComponentInstance?.companyFormGroup.value)
                        .pipe(
                            tap(() => this.fetchDataSource.next(this.queryObject)),
                            delay(1000), // TODO: to test loading indicator.
                        )
                        .subscribe(
                            {
                                next: (res) => {
                                    this.notify.error(NOTIFYMESSAGE.SUCCESS, "Save company is successfully !");
                                },
                                error: (err) => {
                                    this.notify.error(NOTIFYMESSAGE.ERR, err.message);
                                }
                            }
                        );
                } else {
                    contentComponentInstance?.showError();
                    return false;
                }
            },
        });
    }
}
