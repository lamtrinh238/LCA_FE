import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

// export interface ColumnItem<T> {
//   name: string;
//   sortOrder: NzTableSortOrder | null;
//   sortFn: NzTableSortFn<DataItem> | null;
//   listOfFilter: NzTableFilterList;
//   filterFn: NzTableFilterFn<DataItem> | null;
// }

// filter: []
// pageIndex: 1
// pageSize: 10
// sort: Array(2)
// 0: {key: "usrId", value: null}
// 1: {key: "usrFullname", value: "descend"}

export class ColumnModel {
  title: string;
  width: string;
  sort?: boolean;
  sortKey?: string;
}

export interface ApiFilterObject {
  page: number;
  pageSize: number;
  filterText: string;
  sortText: string;
}
export type FilterOperator = 'like' | 'equal';
export class SortObject {
  constructor(public key: string, public value: 'descend' | 'ascend') {}

  toSortString(): string {
    return `${this.key}.${this.value === 'ascend' ? 'asc' : 'desc'}`;
  }
}
export class FilterObject {
  constructor(public key: string, public value: string | number, public operator: FilterOperator) {}

  toFilterString(): string {
    return [this.key, `[${this.operator}]`, this.value].join('');
  }
}
export class QueryParamObject {
  constructor(public filter: FilterObject[], public pageIndex: number, public pageSize: number, public sort: SortObject[]) {}

  toApiFilterQuery(): {
    page: number;
    pageSize: number;
    sortText: string; // usrLoginname.asc
    filterText: string; // usrLoginname[like]ekonect
  } {
    const filter = {
      page: this.pageIndex,
      pageSize: this.pageSize,
    } as ApiFilterObject;
    const sortApi = this.sort && this.sort.filter((s: SortObject) => s.value !== null);
    const filterApi = this.filter && this.filter.filter((f: FilterObject) => f.value !== null && f.value !== undefined);
    if (sortApi && sortApi.length > 0) {
      filter.sortText = sortApi.map((sort: SortObject) => sort.toSortString()).join('&');
    }

    if (filterApi && filterApi.length > 0) {
      filter.filterText = filterApi.map((sort: FilterObject) => sort.toFilterString()).join('&');
    }

    return filter;
  }
}
