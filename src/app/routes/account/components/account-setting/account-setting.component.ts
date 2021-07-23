import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticatedUser, AuthenticationService, UserService } from '@core';

@Component({
  selector: 'lca-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.less'],
})
export class AccountSettingComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _authenticationService: AuthenticationService,
  ) {}

  currentUser: AuthenticatedUser;

  ngOnInit(): void {
    this.currentUser = this._authenticationService.currentUserValue;
    this.formGroup = this._formBuilder.group({
      usrFullname: ['', [Validators.required]],
      usrAdd: '',
      usrZip: ['', [Validators.required]],
      usrCity: ['', [Validators.required]],
      usrPhone1: ['', [Validators.required]],
      usrEmail: ['', [Validators.required]],
      usrLoginname: ['', [Validators.required]],
    });
    this._userService.getCurrentUser(this.currentUser.usrId).subscribe((data) => {
      // @ts-ignore
      this.formGroup.patchValue(data);
    });
  }

  submitForm(): void {
    console.log(this.formGroup.value);
    this._userService.updateCurrentUser(this.currentUser.usrId, this.formGroup.value).subscribe({
      next: (data) => {
        console.log(data);
        location.reload();
      },
    });
  }
}
