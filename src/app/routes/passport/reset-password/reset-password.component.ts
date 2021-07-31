import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, ForgotPasswordService, ResetPasswordService } from '@core';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of, pipe, Subject } from 'rxjs';
import { catchError, exhaustMap, tap } from 'rxjs/operators';

@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less'],
})
export class ResetPasswordComponent implements OnInit {
    loading = false;
    error: string | undefined;
    formGroup: FormGroup;

    private startSendForgotPasswordResetSource = new Subject();
    startSendRequest$ = this.startSendForgotPasswordResetSource.asObservable();

    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.formGroup.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private forgotPasswordService: ResetPasswordService,

        private translateService: TranslateService,
        private notification: NzNotificationService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            token: [this.route.snapshot.queryParams.token, Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', [this.confirmValidator]],
        });

        this.startSendRequest$
            .pipe(
                tap(() => (this.loading = true)),
                exhaustMap(() =>
                    this.forgotPasswordService
                        .add(this.formGroup.value)
                        .pipe(catchError((errRes: HttpErrorResponse) => of(errRes))),
                ),
            )
            .subscribe({
                next: (res: HttpErrorResponse | any) => {
                    this.loading = false;
                    if (res.error) {
                        this.error = `error.${res.error?.code}`;
                        return;
                    }

                    this.notification.success('Congrats!', 'Your password has been reset.');
                },
                error: (errRes: HttpErrorResponse) => {
                    this.loading = false;
                    this.error = `error.${errRes?.error?.code}`;
                },
            });
    }

    sendForgotPasswordRequest(): void {
        this.error = '';
        for (const key in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(key)) {
                this.formGroup.controls[key].markAsDirty();
                this.formGroup.controls[key].updateValueAndValidity();
            }
        }

        if (this.formGroup.valid) {
            this.startSendForgotPasswordResetSource.next();
        }
    }

    validateConfirmPassword(): void {
        setTimeout(() => this.formGroup.controls.confirmPassword.updateValueAndValidity());
    }
}
