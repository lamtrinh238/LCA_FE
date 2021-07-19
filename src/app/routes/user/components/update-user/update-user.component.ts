import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '@core';
import keys from 'lodash/keys';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'lca-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
  formGroup: FormGroup;
  @Input() data: UserModel;

  constructor(private _formBuilder: FormBuilder, private _nzModalService: NzModalService) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      usrLoginname: ['', [Validators.required]],
      usrEmail: ['', [Validators.email, Validators.required]],
      usrFullname: ['', [Validators.required]],
      usrAdd: ['', [Validators.required]],
      usrZip: ['', [Validators.required]],
      usrCity: ['', [Validators.required]],
      usrPhone1: ['', [Validators.required]],
      // password: ['', [Validators.required]],
      usrComments: ['', [Validators.required]],
    });

    this.formGroup.patchValue(this.data);
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
