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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Subscribe to cart items
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      console.log(items);
    });
  }
}

export interface CartItem {
  type: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity: number;
}
