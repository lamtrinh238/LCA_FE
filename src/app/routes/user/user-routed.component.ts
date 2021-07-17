import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilterObject, QueryParamObject, UserModel, UserService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { CreateUserComponent } from './components/create-user/create-user.component';

@Component({
  templateUrl: './user-routed.component.html',
  styleUrls: ['./user-routed.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRoutedComponent implements OnInit {
  constructor(private _userService: UserService, private _nzModalService: NzModalService) {}

  users$: Observable<UserModel[]>;
  private fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
  fetchDateStart$ = this.fetchDataSource.asObservable();
  isFiltering = false;
  private queryObject: QueryParamObject;

  ngOnInit(): void {
    this.users$ = this.fetchDateStart$
      .pipe(
        filter((filterObject: QueryParamObject | undefined) => filterObject !== undefined),
        tap(() => (this.isFiltering = true)),
        switchMap(() => this._userService.filter(this.queryObject)),
        tap(() => (this.isFiltering = false)),
      )
      .pipe(
        finalize(() => {
          this.isFiltering = false;
        }),
      );
  }

  onOpenAddUser(user: any): void {
    this._nzModalService.create({
      nzTitle: 'Create User',
      nzOkText: 'Save',
      nzWidth: 1024,
      nzContent: CreateUserComponent,
      nzClosable: false,
      nzMaskClosable: false,
      nzOnOk: (contentComponentInstance?: CreateUserComponent) => {
        console.log(contentComponentInstance);
        if (contentComponentInstance?.formGroup.valid) {
          return of({}).pipe(delay(2000)).toPromise();
        } else {
          contentComponentInstance?.showError();
          return false;
        }
      },
    });
  }

  onFilter(filterInput: HTMLInputElement): void {
    console.log(filterInput.value);
    const filterTerm = filterInput.value;
    this.queryObject.filter = [new FilterObject('usrFullname', filterTerm, 'like')];
    this.fetchDataSource.next(this.queryObject);
  }

  onFilterParamChanged(queryObject: QueryParamObject): void {
    this.queryObject = queryObject;
    this.fetchDataSource.next(this.queryObject);
  }
}
