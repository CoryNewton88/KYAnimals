import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './cart.component';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Initialize cartItems from sessionStorage when the service is created
    const storedItems = sessionStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItemsSubject.next(JSON.parse(storedItems));
    }
  }

  addItemToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, item];
    this.cartItemsSubject.next(updatedItems);

    // Update sessionStorage with the updated items
    sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }

  removeItemFromCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((cartItem) => cartItem !== item);
    this.cartItemsSubject.next(updatedItems);

    // Update sessionStorage with the updated items
    sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }
}
