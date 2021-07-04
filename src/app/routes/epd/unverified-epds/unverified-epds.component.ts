import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Epd } from '../models/epd';
import { EpdService } from '../services/epd.service';

@Component({
  selector: 'app-unverified-epds',
  templateUrl: './unverified-epds.component.html',
  styleUrls: ['./unverified-epds.component.less'],
})
export class UnverifiedEpdsComponent implements OnInit {
  epds: Epd[] = [];
  listOfColumn = [
    {
      title: 'ID',
      compare: null,
      priority: false,
    },
    {
      title: 'Internal Number',
      priority: 3,
    },
    {
      title: 'Name',
      priority: 2,
    },
    {
      title: 'Date',
      priority: 1,
    },
    {
      title: 'Epd Unit',
      priority: 1,
    },
    {
      title: 'Kg/DU',
      priority: 1,
    },
    {
      title: 'Editor',
      priority: 1,
    },
    {
      title: 'Manufacturer',
      priority: 1,
    },
    {
      title: 'Production Site',
      priority: 1,
    },
    {
      title: 'Comments',
      priority: 1,
    },
    {
      title: 'PCR',
      priority: 1,
    },
  ];
  constructor(private epdService: EpdService) {
    this.epdService.getUnverifiedEpds().subscribe({
      next: (data: Epd[]) => {
        this.epds = data;
      },
    });
  }

  ngOnInit(): void {}
}
