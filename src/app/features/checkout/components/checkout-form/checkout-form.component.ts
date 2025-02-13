import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldConfig } from '../../../../models/field-config.model';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Output() formSubmitted = new EventEmitter<any>();

  public formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    const formGroup: any = {};
    this.fields.forEach(field => {
      const validations = field.validations?.map(val => val.validator) || [];
      formGroup[field.name] = new FormControl(field.value || '', validations);
    });
    this.formGroup = new FormGroup(formGroup);
  }

 public getErrorMessage(controlName: string): string {
    const control = this.formGroup.get(controlName);
    const field = this.fields.find(f => f.name === controlName);

    if (field?.validations) {
      for (let validation of field.validations) {
        if (control?.hasError(validation.name)) {
          return validation.message;
        }
      }
    }

    return '';
  }

 public isFieldRequired(field: any): boolean {
  return field?.validations?.some((v: any) => v.name === 'required');
}

}
