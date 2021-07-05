import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { I18NService } from '@core';
import { STColumn } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { getTimeDistance } from '@delon/util/date-time';
import { deepCopy } from '@delon/util/other';
import { yuan } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { cardData } from '_mock/_analysis';
import { Analysis } from './models/analysis';
@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalysisComponent implements OnInit {
  constructor(private http: _HttpClient, public msg: NzMessageService, private i18n: I18NService, private cdr: ChangeDetectorRef) {}

  data: Array<Analysis> = cardData;
  loading = true;
  date_range: Date[] = [];
  rankingListData: Array<{ title: string; total: number }> = Array(7)
    .fill({})
    .map((_, i) => {
      return {
        title: this.i18n.fanyi('app.analysis.test', { no: i }),
        total: 323234,
      };
    });
  titleMap = {
    y1: this.i18n.fanyi('app.analysis.traffic'),
    y2: this.i18n.fanyi('app.analysis.payments'),
  };
  searchColumn: STColumn[] = [
    { title: { text: '排名', i18n: 'app.analysis.table.rank' }, index: 'index' },
    {
      title: { text: '搜索关键词', i18n: 'app.analysis.table.search-keyword' },
      index: 'keyword',
      click: (item) => this.msg.success(item.keyword),
    },
    {
      type: 'number',
      title: { text: '用户数', i18n: 'app.analysis.table.users' },
      index: 'count',
      sort: {
        compare: (a, b) => a.count - b.count,
      },
    },
    {
      type: 'number',
      title: { text: '周涨幅', i18n: 'app.analysis.table.weekly-range' },
      index: 'range',
      render: 'range',
      sort: {
        compare: (a, b) => a.range - b.range,
      },
    },
  ];

  salesType = 'all';
  salesPieData: any;
  salesTotal = 0;

  saleTabs: Array<{ key: string; show?: boolean }> = [{ key: 'sales', show: true }, { key: 'visits' }];

  offlineIdx = 0;

  ngOnInit(): void {
    this.http.get('/chart').subscribe((res) => {
      res.offlineData.forEach((item: any, idx: number) => {
        item.show = idx === 0;
        item.chart = deepCopy(res.offlineChartData);
      });
      this.data = res;
      this.loading = false;
    });
  }
}
