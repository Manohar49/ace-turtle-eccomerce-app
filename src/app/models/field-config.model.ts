import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  type: string;
  label: string;
  name: string;
  value?: any;
  placeholder?: string;
  validations?: {
    name: string;
    validator: ValidatorFn;
    message: string;
  }[];
}
