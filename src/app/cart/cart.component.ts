import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  overallTotal: number = 0; // Initialize the overall total to 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Retrieve data from sessionStorage when the component initializes
    const storedData = sessionStorage.getItem('cartItems');

    if (storedData) {
      // If data exists in sessionStorage, parse it (assuming it's JSON) and use it
      this.cartItems = JSON.parse(storedData);
      this.calculateTotals(); // Calculate totals initially
    } else {
      // Handle the case where no data is found in sessionStorage
      console.log('No data found in sessionStorage');
    }
  }

  addItem(item: CartItem): void {
    // Update the quantity of the item in the cart
    item.quantity += 1;
    this.calculateTotals(); // Recalculate totals after adding
    this.updateCart();
  }

  removeItem(item: CartItem): void {
    // Update the quantity of the item in the cart, and remove if quantity becomes zero
    item.quantity -= 1;
    if (item.quantity <= 0) {
      this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
    }
    this.calculateTotals(); // Recalculate totals after removing
    this.updateCart();
  }

  private calculateTotals(): void {
    // Calculate totals for each item and overall total
    this.overallTotal = this.cartItems.reduce((total, item) => {
      item.total = item.price * item.quantity;
      return total + item.total;
    }, 0);
  }

  private updateCart(): void {
    // Update sessionStorage with the updated cart items
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  purchase(): void {
    // Implement your purchase logic here
    // You can clear the cart and perform other actions
  }
}
export interface CartItem {
  type: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity: number;
  total: number;
}
