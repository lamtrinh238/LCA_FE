import { BaseObjectFilterModel } from '@core';

export class UserFilterModel extends BaseObjectFilterModel {
  constructor() {
    super();
    this.filterBy = ['usrId', 'usrFullname', 'usrLoginname', 'usrEmail', 'usrAdd', 'usrZip', 'usrPhone1', 'usrCity'];
  }
}
