import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../core/domain/services/account.service';

@Component({
  selector: 'lca-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.less'],
})
export class AccountSettingComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private  _formBuilder: FormBuilder, private _accountService: AccountService) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const currentUserId = currentUser.usrId;

    this.formGroup = this._formBuilder.group({
      usrFullname: ['', [Validators.required]],
      usrAdd: ['', [Validators.required]],
      usrZip: ['', [Validators.required]],
      usrCity: ['', [Validators.required]],
      usrPhone1: ['', [Validators.required]],
      usrEmail: ['', [Validators.required]],
      usrLoginname: ['', [Validators.required]],
      usrPassword: ['', [Validators.required]],
    });
    this._accountService.getCurrentUser(currentUserId).subscribe((data) => {
      // @ts-ignore
      this.formGroup.patchValue(data);
    });
  }
}
