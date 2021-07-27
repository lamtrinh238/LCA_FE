import { BaseObjectFilterModel, ComSWID, FilterObject } from '@core';

export class ClientFilterModel extends BaseObjectFilterModel {
  comSWID: ComSWID;
  constructor() {
    super();
    this.comSWID = ComSWID.All;
    this.filterBy = [
      'comId',
      'comCompanyvat',
      'comCompanyname',
      'comEmail',
      'comAdd',
      'comZip',
      'comCity',
      'comPhone1',
      'comMainContact',
      'comWeb',
    ];
  }
  toFilterObjects(): FilterObject[] {
    const filterObjects = super.toFilterObjects();
    return [new FilterObject('ComSW', this.comSWID === ComSWID.All ? null : this.comSWID, 'equal'), ...filterObjects];
  }

  clear(): void {
    super.clear();
    this.comSWID = ComSWID.All;
  }
}
