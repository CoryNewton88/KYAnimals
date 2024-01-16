import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Animal } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedAnimalTypeSubject = new BehaviorSubject<string>('all');
  selectedAnimalType$: Observable<string> = this.selectedAnimalTypeSubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  setSelectedAnimalType(animalType: string): void {
    this.selectedAnimalTypeSubject.next(animalType);
  }

  addToCart(item: Animal): void {
    // Create a CartItem object with type, price, and quantity
    const cartItem: CartItem = {
      type: item.type,
      price: item.price,
      imageUrl: item.imageUrl,
      description: item.description,
      quantity: 1 // You can adjust the quantity as needed
    };

    // Get the current cart items
    const currentCartItems = this.cartItemsSubject.value;

    // Check if the item is already in the cart
    const existingItem = currentCartItems.find((ci) => ci.type === cartItem.type);

    if (existingItem) {
      // If the item is already in the cart, update the quantity
      existingItem.quantity++;
    } else {
      // If it's a new item, add it to the cart
      currentCartItems.push(cartItem);
    }

    // Update the cart items
    this.cartItemsSubject.next([...currentCartItems]);
  }
}

interface CartItem {
  type: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity: number;
}
