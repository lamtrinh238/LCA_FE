import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  // {
  //   "roles": "string",
  //   "usrId": 0,
  //   "usrLoginname": "string",
  //   "usrType": 0,
  //   "usrFullname": "string",
  //   "usrEmail": "string",
  //   "usrAdd": "string",
  //   "usrProid": "string",
  //   "usrZip": "string",
  //   "usrPhone1": "string",
  //   "usrPhone2": "string",
  //   "usrStatus": true,
  //   "usrCreatedttm": "2021-07-15T00:37:52.655Z",
  //   "usrCreatedby": 0,
  //   "usrResetpwd": "string",
  //   "usrCity": "string",
  //   "usrOrganization": "string",
  //   "usrCompid": 0,
  //   "usrTraining": "2021-07-15T00:37:52.655Z",
  //   "usrTrainingValid": "2021-07-15T00:37:52.655Z",
  //   "usrGdpr": "2021-07-15T00:37:52.655Z",
  //   "lastLogin": "2021-07-15T00:37:52.655Z",
  //   "usrGuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "usrActive": 0,
  //   "usrApproved": 0,
  //   "usrComments": "string"
  // }
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
