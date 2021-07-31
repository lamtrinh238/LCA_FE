import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryModel } from '@core';
import keys from 'lodash/keys';

@Component({
  selector: 'lca-client-create',
  templateUrl: './client-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCreateComponent implements OnInit {
  formGroup: FormGroup;
  @Input() countries: CountryModel[];
  @Input() comSW: number;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      ComCompanyname: ['', [Validators.required]],
      ComCompanyvat: ['', []],
      ComEmail: ['', [Validators.email]],
      ComAdd: ['', []],
      ComZip: ['', []],
      ComCity: ['', []],
      ComPhone1: ['', [Validators.pattern('[- +()0-9]+')]],
      ComMainContact: ['', []],
      ComWeb: ['', []],
      ComCountry: [1, []],
      ComSW: [this.comSW, []],
    });
  }

  submitForm(value: unknown): void {
    console.log(value);
  }

  showError(): void {
    keys(this.formGroup.controls).forEach((key: string) => {
      this.formGroup.controls[key].markAsTouched();
      this.formGroup.controls[key].updateValueAndValidity();
    });
  }
}
