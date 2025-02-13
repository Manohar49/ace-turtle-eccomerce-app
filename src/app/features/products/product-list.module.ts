import '@cds/core/icon/register.js';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { FormsModule } from '@angular/forms';
import { ClarityIcons, angleIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { ProductListComponent } from './product-list.component';


@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ProductListRoutingModule
    ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ProductListComponent,
  ]
})
export class ProductListModule { 
  constructor(){
  ClarityIcons.addIcons(angleIcon);
  }
}
