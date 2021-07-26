import { BaseObjectFilterModel } from '@core';

export class UserFilterModel extends BaseObjectFilterModel {
  constructor() {
    super();
    this.filterBy = ['usrFullname', 'usrLoginname', 'usrEmail', 'usrAdd', 'usrZip', 'usrPhone1', 'usrCity'];
  }
}
