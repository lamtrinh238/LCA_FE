import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import keys from 'lodash/keys';

@Component({
  selector: 'lca-client-create',
  templateUrl: './client-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCreateComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({});
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
