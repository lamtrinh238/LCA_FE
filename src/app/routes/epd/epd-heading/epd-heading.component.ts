import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-epd-heading',
  templateUrl: './epd-heading.component.html',
})
export class EpdHeadingComponent implements OnInit {
  tabs = [
    {
      text: 'Unverified EPDs',
      path: 'unverified-epds',
    },
    {
      text: 'EPDs for verification',
      path: 'epds-verification',
    },
    {
      text: 'Verified EPDs',
      path: 'verified-epds',
    },
  ];
  // selectedPage: string;
  constructor(private activatedRoute: ActivatedRoute) {
    // this.selectedPage = this.links[0];
    this.activatedRoute.url.subscribe({
      next: (params: Params) => {
        console.log(params);
      },
    });
  }

  ngOnInit(): void {}

  onActivate(event: any): void {
    console.log(event);
  }
}
