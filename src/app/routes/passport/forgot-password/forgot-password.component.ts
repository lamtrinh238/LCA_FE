import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, ForgotPasswordService } from '@core';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of, pipe, Subject } from 'rxjs';
import { catchError, exhaustMap, tap } from 'rxjs/operators';

@Component({
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.less'],
})
export class ForgotPasswordComponent implements OnInit {
    loading = false;
    error: string | undefined;
    formGroup: FormGroup;

    private startSendForgotPasswordResetSource = new Subject();
    startSendRequest$ = this.startSendForgotPasswordResetSource.asObservable();
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private forgotPasswordService: ForgotPasswordService,

        private translateService: TranslateService,
        private notification: NzNotificationService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            userEmail: ['', [Validators.required, Validators.email]],
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

                    this.notification.success('Congrats!', 'Your request has been sent. Please check your inbox.');
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
}
