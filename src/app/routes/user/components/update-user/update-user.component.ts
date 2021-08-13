import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel, UserService } from '@core';
import keys from 'lodash/keys';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
    selector: 'lca-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _nzModalService: NzModalService,
        private _userService: UserService,
    ) {}

    formGroup: FormGroup;
    @Input() data: UserModel;
    UserComLinks = [];
    isLoading = false;

    listOfColumns = [
        {
            title: 'ID',
            width: '5px',
        },
        {
            title: 'Company',
            width: '15px',
        },
        {
            title: 'Role',
            width: '5px',
        },
        {
            title: 'Edit',
            width: '5px',
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
    }

    getCompanyLinks(): Observable<UserModel> {
        return this._userService.get(this.data.usrId!);
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
}
