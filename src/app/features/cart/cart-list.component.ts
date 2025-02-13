import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})

export class CartListComponent implements OnInit {
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  cartTotal: number = 0;
  isCheckoutModalOpen: boolean = false;

  constructor(private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.calculateCartTotal();
  }

increaseQuantity(item: CartItem): void {
  this.cartService.incrementQuantity(item);
  this.calculateCartTotal();
}


decreaseQuantity(item: CartItem): void {
  if (item.quantity > 1) {
    this.cartService.decrementQuantity(item);
    this.calculateCartTotal();
  } else {
    this.removeFromCart(item);
  }
}


  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
    this.calculateCartTotal();
  }

  calculateCartTotal(): void {
    this.cartItems$.subscribe(items => {
      this.cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    });
  }

  onOrderConfirmed(): void {
    this.cartService.clearCart();
    this.isCheckoutModalOpen = false;
    this.router.navigate(['/products']);
  }

  trackByFn(index: number, item: CartItem): number {
    return item.id;
  }

  navigateToProducts(): void {
  this.router.navigate(['/products']);
}
}
