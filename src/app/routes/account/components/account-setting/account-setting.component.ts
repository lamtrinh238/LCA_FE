import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticatedUser, AuthenticationService, UserService } from '@core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
    private notification: NzNotificationService,
  ) {}

  currentUser: AuthenticatedUser;

  isLoading = false;

  ngOnInit(): void {
    this.currentUser = this._authenticationService.currentUserValue;
    this.formGroup = this._formBuilder.group({
      usrFullname: ['', [Validators.required]],
      usrAdd: '',
      usrZip: '',
      usrCity: '',
      usrPhone1: '',
      usrEmail: '',
      usrLoginname: [{ value: '', disabled: true }, [Validators.required]],
    });
    this._userService.getCurrentUser(this.currentUser.usrId).subscribe((data) => {
      // @ts-ignore
      this.formGroup.patchValue(data);
    });
  }

  submitForm(): void {
    this.isLoading = true;
    this._userService.updateCurrentUser(this.currentUser.usrId, this.formGroup.getRawValue()).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log(this.formGroup);
        this.createAutoUpdatingNotifications();
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  createAutoUpdatingNotifications(): void {
    this.notification.blank('Succesful!', 'You have updated your profile');
  }
}
