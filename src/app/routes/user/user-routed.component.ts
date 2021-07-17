import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserModel, UserService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { CreateUserComponent } from './components/create-user/create-user.component';

@Component({
  templateUrl: './user-routed.component.html',
  styleUrls: ['./user-routed.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRoutedComponent implements OnInit {
  constructor(private _userService: UserService, private _nzModalService: NzModalService) {}

  users$: Observable<UserModel[]>;
  isFiltering = true;

  ngOnInit(): void {
    this.users$ = this._userService
      .filter({
        page: 1,
        pageSize: 10,
        sortText: 'usrFullname.asc',
      })
      .pipe(finalize(() => (this.isFiltering = false)));
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
    this.isFiltering = true;
    this.users$ = this._userService
      .filter({
        page: 1,
        pageSize: 10,
        sortText: 'usrFullname.asc',
        filterText: filterInput ? `usrFullname[like]${filterTerm}` : '',
      })
      .pipe(finalize(() => (this.isFiltering = false)));
  }
}
