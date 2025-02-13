import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
   @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() orderConfirmed = new EventEmitter<void>();

  constructor(private router:Router){

  }

  public checkoutFields: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full Name',
      name: 'fullName',
      validations: [
        { name: 'required', validator: Validators.required, message: 'Name is required' }
      ]
    },
    {
      type: 'input',
      label: 'Phone Number',
      name: 'phoneNumber',
      validations: [
        { name: 'required', validator: Validators.required, message: 'Phone is required' },
        { name: 'pattern', validator: Validators.pattern('^[0-9]{10}$'), message: 'Enter a valid 10-digit phone number' }
      ]
    },
    {
      type: 'input',
      label: 'Email',
      name: 'email',
      validations: [
        { name: 'required', validator: Validators.required, message: 'Email is required' },
        { name: 'email', validator: Validators.email, message: 'Enter a valid email' }
      ]
    },
    {
      type: 'textarea',
      label: 'Address',
      name: 'address',
      validations: [
        { name: 'required', validator: Validators.required, message: 'Address is required' }
      ]
    }
  ];

  onCancel(form:FormGroup):void{
    form.reset()
    this.closeModal.emit(false)
  }

    onSubmit(form: FormGroup): void {
    if (form.valid) {
      console.log('Form Data:', form.value);
      alert('Order confirmed! Redirecting to product list...');
      this.closeModal.emit(false);
      this.orderConfirmed.emit();
      this.router.navigate(['/products']);
    }
}
}