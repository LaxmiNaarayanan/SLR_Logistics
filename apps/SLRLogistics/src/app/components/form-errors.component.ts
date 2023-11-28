import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [TitleCasePipe, NgIf],
  template: `
    <div
      *ngIf="controlName.invalid && (controlName.dirty || controlName.touched)"
      class="alert alert-danger"
    >
      <div *ngIf="controlName.errors?.['required']">
        {{ formControlName | titlecase }} is required.
      </div>
      <div *ngIf="controlName.errors?.['minlength']">
        Name must be at least 4 characters long.
      </div>
    </div>
  `,
  styles: `
    .alert {
        padding: 0.5rem;
    }
  `
})
export class FormErrorsComponent {
  formControlName!: string;

  @Input({ required: true }) set controlName(name: string) {
    this.formControlName = name;
  }

  get controlName(): AbstractControl<any, any> {
    return this.formGroup.get(this.formControlName) as AbstractControl<any, any>;
  }

  @Input({ required: true }) formGroup!: FormGroup;
}
