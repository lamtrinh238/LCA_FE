import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@core';

@Component({
  selector: 'lca-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.less'],
})
export class AccountSettingComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _userService: UserService) {}

  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  currentUserId = this.currentUser.usrId;

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      usrFullname: '',
      usrAdd: '',
      usrZip: '',
      usrCity: '',
      usrPhone1: '',
      usrEmail: '',
      usrLoginname: '',
      usrPassword: '',
    });
    this._userService.getCurrentUser(this.currentUserId).subscribe((data) => {
      // @ts-ignore
      this.formGroup.patchValue(data);
    });
  }

  submitForm(): void {
    console.log(this.formGroup.value);
    this._userService.updateCurrentUser(this.currentUserId, this.formGroup.value).subscribe({
      next: (data) => {
        console.log(data);
        location.reload();
      },
    });
  }
}
