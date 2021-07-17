import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

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
