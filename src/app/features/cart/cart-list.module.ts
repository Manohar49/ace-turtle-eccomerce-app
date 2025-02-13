import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListRoutingModule } from './cart-list-routing.module';
import { CartListComponent } from './cart-list.component';
import { ClarityModule } from '@clr/angular';
import { CheckoutModule } from '../checkout/checkout.module';


@NgModule({
  declarations: [
    CartListComponent
    ],
  imports: [
    CommonModule,
    CartListRoutingModule,
    ClarityModule,
    CheckoutModule
  ]
})
export class CartListModule { }
