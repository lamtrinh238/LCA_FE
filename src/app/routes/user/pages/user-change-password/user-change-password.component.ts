import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService, SessionService } from '@core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.less'],
})
export class UserChangePasswordComponent implements OnInit {
  formGroup: FormGroup;
  updatingPassword = false;
  private startChangePasswordSource = new Subject<any>();
  private startChangePassword$ = this.startChangePasswordSource.asObservable();

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.formGroup.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private formBuilder: FormBuilder,
    private changePasswordService: ChangePasswordService,
    private sessionService: SessionService,
    public translateService: TranslateService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', [this.confirmValidator]],
    });

    this.startChangePassword$
      .pipe(
        tap(() => (this.updatingPassword = true)),
        exhaustMap(() =>
          this.changePasswordService.update(this.sessionService.authenticatedUserSnapshot.usrId, this.formGroup.value),
        ),
      )
      .subscribe({
        next: () => {
          this.updatingPassword = false;
          this.notification.success('Congrats!', 'You have changed password successfully.');
        },
        error: (eess: HttpErrorResponse) => {
          this.notification.error('Oops!', this.translateService.instant(`error.${eess.error.code}`));
          this.updatingPassword = false;
        },
      });
  }

  changePassword(): void {
    for (const key in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(key)) {
        this.formGroup.controls[key].markAsDirty();
        this.formGroup.controls[key].updateValueAndValidity();
      }
    }
    if (this.formGroup.valid) {
      this.startChangePasswordSource.next();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.formGroup.controls.confirmNewPassword.updateValueAndValidity());
  }
}
