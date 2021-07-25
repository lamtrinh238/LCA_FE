import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedUser, AuthenticationService, LoginRequest } from '@core';
@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.authenticationService.authSucceed$.subscribe({
      next: (authenticateduser: AuthenticatedUser) => {
        this.loading = false;
        this.error = undefined;
        this.router.navigateByUrl('dashboard');
      },
    });

    this.authenticationService.authFailed$.subscribe({
      next: (error: any) => {
        this.loading = false;
        this.error = 'Invalid Username/Password.';
      },
    });

    this.loginForm = this.formBuilder.group({
      userName: ['Administrator', Validators.required],
      password: ['Marina070485&', Validators.required],
    });

    if (localStorage.currentUser) {
      this.router.navigateByUrl('dashboard');
    }

    this.router.navigate(['/passport/login']);
  }

  get loginControls(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.error = '';

    if (this.loginForm.invalid) {
      this.loginControls.userName.markAsDirty();
      this.loginControls.userName.updateValueAndValidity();
      this.loginControls.password.markAsDirty();
      this.loginControls.password.updateValueAndValidity();
      return;
    }

    this.loading = true;
    this.authenticationService.startLogin(this.loginForm.value);
  }
}
