import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ColumnModel, FilterObject, QueryParamObject, SortObject } from '../domain';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseDataList<T> {
  @Input() data: T[] = [];
  @Input() isLoading: boolean;
  @Output() filterParamChanged = new EventEmitter<QueryParamObject>();
  pageSizeOptions = [10, 20, 50, 100];
  @Input() totalRecords = 100;

  listOfColumns: ColumnModel[];
  constructor(protected _changeDetectorRef: ChangeDetectorRef) {
    this.listOfColumns = this.setupColumnModels();
  }

  onQueryParamChange(event: QueryParamObject): void {
    const queryObject = new QueryParamObject(
      event.filter.map((v: FilterObject) => new FilterObject(v.key, v.value, v.operator)),
      event.pageIndex,
      event.pageSize,
      event.sort.map((s: SortObject) => new SortObject(s.key, s.value)),
    );

    this.filterParamChanged.next(queryObject);
  }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach((item: ColumnModel) => {
      item.sortOrder = null;
    });
  }

  abstract setupColumnModels(): ColumnModel[];
}
