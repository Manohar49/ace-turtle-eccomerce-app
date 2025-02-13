import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { ClarityModule, ClrModal } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutFormComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  exports:[CheckoutComponent, CheckoutFormComponent]
})
export class CheckoutModule { }
