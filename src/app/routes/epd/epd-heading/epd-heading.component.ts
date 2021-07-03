import { Component, OnInit } from '@angular/core';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-epd-heading',
  templateUrl: './epd-heading.component.html',
  styleUrls: ['./epd-heading.component.less'],
})
export class EpdHeadingComponent implements OnInit {
  links = ['unverified-epds', 'epds-verification', 'verified-epds'];
  constructor() {}

  ngOnInit(): void {}
}
