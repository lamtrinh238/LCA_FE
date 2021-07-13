import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (localStorage.currentUser) {
      this.router.navigateByUrl('dashboard');
    }
    this.router.navigate(['/passport/login']);
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.error = '';
    this.f.username.markAsDirty();
    this.f.username.updateValueAndValidity();
    this.f.password.markAsDirty();
    this.f.password.updateValueAndValidity();
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.error = 'Invalid Username/Password. Contact your admin for more infomation';
      this.loading = true;
      this.loading = false;
      return;
    } else if (this.loginForm.invalid) {
      this.authenticationService
        .login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe((data) => {
          this.loading = true;
          this.router.navigateByUrl('dashboard');
          if (!data) {
            this.loading = false;
            this.cdr.detectChanges();
            return;
          }
        });
    }
    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe((data) => {
        this.loading = true;
        this.error = '';
        this.router.navigateByUrl('dashboard');
      });
  }
}
