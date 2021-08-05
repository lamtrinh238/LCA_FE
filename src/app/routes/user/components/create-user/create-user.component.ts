import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import keys from 'lodash/keys';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'lca-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder, private _nzModalService: NzModalService) {}

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
