import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserListService } from '../routes/user/services/user-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserListResolver implements Resolve<boolean> {
  constructor(private listService: UserListService) {}
  resolve() {
    return this.listService.getUserList();
  }
}
