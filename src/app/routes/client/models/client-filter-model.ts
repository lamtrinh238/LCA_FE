import { BaseObjectFilterModel, ComSWID, FilterObject } from '@core';

export class ClientFilterModel extends BaseObjectFilterModel {
  comSWID: ComSWID;
  constructor() {
    super();
    this.comSWID = ComSWID.eEPD;
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
    return [new FilterObject('ComSW', this.comSWID === null ? ComSWID.eEPD : this.comSWID, 'equal'), ...filterObjects];
  }

  clear(): void {
    super.clear();
    this.comSWID = ComSWID.eEPD;
  }
}
