import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  { path: 'products', loadChildren: () => import('./features/products/product-list.module').then(m => m.ProductListModule) },
  { path: 'cart', loadChildren: () => import('./features/cart/cart-list.module').then(m => m.CartListModule) }, 
  { path: 'checkout', loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule)},
  {
    path: '**',
    redirectTo: '/products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
