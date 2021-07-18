import { BaseObjectFilterModel } from '@core';

export class UserFilterModel extends BaseObjectFilterModel {
  constructor() {
    super();
    this.filterBy = ['usrFullname'];
  }
}
