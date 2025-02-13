import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  addToCart(item: CartItem): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }
    
    this.cartItems.next(currentItems);
    this.updateCartCount();
  }

  updateCartItems(items: CartItem[]): void {
    this.cartItems.next(items);
    this.updateCartCount();
  }

  getCartItems(): CartItem[] {
  let cartItems: CartItem[] = [];
  this.cartItems$.subscribe(items => {
    cartItems = [...items];
  });
  return cartItems;
}

  removeFromCart(item: CartItem): void {
    const updatedItems = this.cartItems.value.filter(cartItem => cartItem.id !== item.id);
    this.cartItems.next(updatedItems);
    this.updateCartCount();
  }

  incrementQuantity(item: CartItem): void {
  const cartItems = this.getCartItems();
  const itemIndex = cartItems.findIndex((cartItem:CartItem) => cartItem.id === item.id);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity++;
    this.updateCartItems(cartItems);
  }
}

  decrementQuantity(item: CartItem): void {
  const cartItems = this.cartItems.value;
  const itemIndex = cartItems.findIndex((cartItem:CartItem) => cartItem.id === item.id);

  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity--;
    this.updateCartItems(cartItems);
  }
}


  clearCart(): void {
    this.cartItems.next([]);
    this.cartItemCount.next(0);
  }

  private updateCartCount(): void {
    const totalCount = this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
    this.cartItemCount.next(totalCount);
  }
}
