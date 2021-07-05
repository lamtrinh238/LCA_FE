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
  selectedEpdType: string;
  links = [
    'EPD in work',
    'Archive',
    'EPD for BIM',
    'Internal calculation (MF 2)',
    'EPD list (MF 3)',
    'Copy from module (MF 4)',
    'Cement calculation (MF 5)',
    'Copy from A1-A3 (MF 6)',
    'EPDs transferred to you',
  ];

  listOfColumn = [
    {
      title: 'ID',
      compare: null,
      width: '50px',
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
      width: '80px',
    },
    {
      title: 'Epd Unit',
      priority: 1,
      width: '80px',
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
      width: '20%',
    },
    {
      title: 'PCR',
      priority: 1,
      width: '20%',
    },
  ];
  constructor(private epdService: EpdService) {
    this.epdService.getUnverifiedEpds().subscribe({
      next: (data: Epd[]) => {
        this.epds = data;
      },
    });

    this.selectedEpdType = this.links[0];
  }

  ngOnInit(): void {}

  onEpdTypeChange(epdType: string): void {
    console.log(epdType);
  }
}
