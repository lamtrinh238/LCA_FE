import { BaseObjectFilterModel } from '@core';

export class UserFilterModel extends BaseObjectFilterModel {
  constructor() {
    super();
    this.filterBy = ['usrFullname'];
    this.filterBy = ['usrLoginname'];
    this.filterBy = ['usrEmail'];
    this.filterBy = ['usrAdd'];
    this.filterBy = ['usrZip'];
    this.filterBy = ['usrCity'];
    this.filterBy = ['usrPhone1'];
  }
}
