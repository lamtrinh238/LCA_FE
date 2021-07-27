export class ColumnModel {
  title: string;
  width?: string;
  sort?: boolean;
  sortKey?: string;
  sortOrder?: string | null = null;
}

export interface ApiFilterObject {
  page: number;
  pageSize: number;
  GlobalSearch: string;
  sortText: string;
  filterText: string;
}
export type FilterOperator = 'like' | 'equal';
export class SortObject {
  constructor(public key: string, public value: 'descend' | 'ascend') {}

  toSortString(): string {
    return `${this.key}.${this.value === 'ascend' ? 'asc' : 'desc'}`;
  }
}
export class FilterObject {
  constructor(public key: string, public value: string | number | null, public operator: FilterOperator) {}

  toFilterString(): string {
    return [this.key].join('');
  }
}
export class QueryParamObject {
  constructor(public filter: FilterObject[], public pageIndex: number, public pageSize: number, public sort: SortObject[]) {}

  clear(): void {
    this.filter.length = 0;
    this.sort.length = 0;
    this.pageIndex = 1;
    this.pageSize = 10;
  }
  toApiFilterQuery(): {
    page: number;
    pageSize: number;
    sortText: string; // usrLoginname.asc
    GlobalSearch: string; // usrLoginname[like]ekonect
    filterText: string; // usrLoginname[like]ekonect
  } {
    const filter = {
      page: this.pageIndex,
      pageSize: this.pageSize,
    } as ApiFilterObject;
    const sortApi = this.sort && this.sort.filter((s: SortObject) => s.value !== undefined && s.value !== null);
    const filterApi = this.filter && this.filter.filter((f: FilterObject) => f.value !== null && f.value !== undefined);
    if (sortApi && sortApi.length > 0) {
      filter.sortText = sortApi.map((sort: SortObject) => sort.toSortString()).join('&');
    }

    if (filterApi && filterApi.length > 0) {
      const filterApiGlobal = filterApi.filter((f) => f.operator === 'like');
      if (filterApiGlobal.length > 0) {
        filter.GlobalSearch =
          filterApiGlobal.map((sort: FilterObject) => sort.toFilterString()).join(',') + `[like]${filterApiGlobal[0].value}`;
      }

      const filterApiFilterText = filterApi.filter((f) => f.operator !== 'like');
      if (filterApiFilterText.length > 0) {
        filter.filterText = filterApiFilterText
          .map((sort: FilterObject) => [sort.key, `[${sort.operator}]`, sort.value].join(''))
          .join('&');
      }
    }

    return filter;
  }
}

export abstract class BaseObjectFilterModel {
  filterTerm: string | null;
  filterBy: string[] = [];
  constructor() {}

  toFilterObjects(): FilterObject[] {
    return this.filterBy.map((by: string) => new FilterObject(by, this.filterTerm === '' ? null : this.filterTerm, 'like'));
  }
  clear(): void {
    this.filterTerm = null;
  }
}
