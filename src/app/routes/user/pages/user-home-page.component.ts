import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FilterObject, QueryParamObject, UserModel, UserService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { CreateUserComponent } from '../components/create-user/create-user.component';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UserFilterModel } from '../user-filter-model';

@Component({
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHomePageComponent implements OnInit {
  users$: Observable<UserModel[]>;
  private fetchDataSource = new BehaviorSubject<QueryParamObject | undefined>(undefined);
  fetchDataStart$ = this.fetchDataSource.asObservable();
  isFiltering = false;
  protected queryObject: QueryParamObject;
  filterModel: UserFilterModel;
  @ViewChild('userListComp') userListCompRef: UserListComponent;
  constructor(private _userService: UserService, private _nzModalService: NzModalService) {
    this.filterModel = new UserFilterModel();
  }

  ngOnInit(): void {
    this.users$ = this.fetchDataStart$
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

  onOpenAddUser(): void {
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

  clearFilter(): void {
    this.filterModel.clear();
    this.queryObject.clear();
    this.userListCompRef.resetSortAndFilters();
    this.fetchDataSource.next(this.queryObject);
  }

  onFilter(): void {
    this.queryObject.filter = this.filterModel.toFilterObjects();
    this.fetchDataSource.next(this.queryObject);
  }

  onFilterParamChanged(queryObject: QueryParamObject): void {
    this.queryObject = queryObject;
    this.queryObject.filter.push(...this.filterModel.toFilterObjects());
    this.fetchDataSource.next(this.queryObject);
  }
}
