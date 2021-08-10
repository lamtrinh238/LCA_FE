import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService, FilterObject, QueryParamObject, UserModel, UserService } from '@core';
import keys from 'lodash/keys';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, debounceTime, filter, finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'lca-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
  queryObject: QueryParamObject;
  formGroup: FormGroup;
  @Input() data: UserModel;
  UserComLinks: any;
  isLoading = false;

  selectedUser?: any;

  optionList: any;

  usercompLink$: Observable<UserModel>;

  searchChange$ = new BehaviorSubject('');

  private readonly fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
  fetchDataStart$ = this.fetchDataSource.asObservable();

  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private _nzModalService: NzModalService,
    private _userService: UserService,
    private _clientService: ClientService,
  ) {
    this.queryObject = new QueryParamObject([], 1, 100, []);
  }

  listOfColumns = [
    {
      title: 'ID',
      width: '5px',
    },
    {
      title: 'Company',
      width: '20px',
    },
    {
      title: 'Role',
      width: '5px',
    },
    {
      title: 'Edit',
      width: '3px',
    },
  ];

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      usrLoginname: ['', [Validators.required]],
      usrEmail: ['', [Validators.email, Validators.required]],
      usrFullname: ['', [Validators.required]],
      usrAdd: ['', [Validators.required]],
      usrZip: ['', [Validators.required]],
      usrCity: ['', [Validators.required]],
      usrPhone1: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      // password: ['', [Validators.required]],
      usrComments: [''],
    });

    this.formGroup.patchValue(this.data);

    // this._userService.get(this.data.usrId!).subscribe({
    //     next: (comlink) => (this.UserComLinks = comlink.companies),
    // });

    this.usercompLink$ = this.fetchDataStart$
      .pipe(
        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
        switchMap(() => this._userService.get(this.data.usrId!)),
        tap(pipe((res) => console.log(res))),
      )
      .pipe();

    this.loadCompanyFilter();
  }

  onSearch($event: string): void {
    this.isLoading = true;
    this.searchChange$.next($event);
  }

  loadCompanyFilter(): void {
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(
        tap((res) => {
          if (res != '') {
            this.queryObject.filter.push(new FilterObject('filterText', res, 'equal'));
          }
        }),
      )
      .pipe(
        switchMap((res) => {
          return this.getCompanylist(this.queryObject);
        }),
      );
    optionList$.subscribe((data) => {
      this.optionList = data;
    });
  }

  getCompanylist(filterValue: QueryParamObject): Observable<any> {
    return this._clientService.filter(filterValue);
  }

  submitForm(value: unknown): void {
    console.log(value);
  }
  showError(): void {
    keys(this.formGroup.controls).forEach((key: string) => {
      this.formGroup.controls[key].markAsTouched();
      this.formGroup.controls[key].updateValueAndValidity();
    });
  }

  onClickSave(): void {
    const headers = {
      'Content-Type': 'application/json',
      mode: 'no-cors',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    };
    const body = {
      id: null,
      usrId: this.data.usrId,
      comId: this.selectedUser[0].comId,
      usrType: null,
    };
    this.http
      .post('localhost:44302/api/UserCompLink/usercompLink', body, { headers })
      .subscribe((user) => console.log(user));
  }
}
