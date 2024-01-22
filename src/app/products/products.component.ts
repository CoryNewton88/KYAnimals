import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { CeilPipe } from '../ceil.pipe';
import { SharedService } from '../shared/shared.service';
import { CartItem } from '../cart/cart.component';
import { CartService } from '../cart/cart.service';

export interface Animal {
  id: number;
  type: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, CeilPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',

})
export class ProductsComponent implements OnInit {
  animals: Animal[] = [];
  paginatedAnimals: Animal[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems!: number;

  selectedAnimalType: string = 'all'; // Initialize selectedAnimalType with 'all'
  filteredAnimals: Animal[] = [];

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private cartService: CartService
  ) { }


  ngOnInit(): void {
    // Subscribe to selectedAnimalType$ to update the selectedAnimalType
    this.sharedService.selectedAnimalType$.subscribe((animalType) => {
      this.selectedAnimalType = animalType;
      this.loadAnimals(); // Load animals whenever the selectedAnimalType changes
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
  loadAnimals(): void {
    this.http.get<Animal[]>('/assets/files/animals.json').subscribe(data => {
      // Map animals and add imageUrl
      this.animals = data.map(animal => ({
        ...animal,
        imageUrl: this.getImageUrlForAnimal(animal.type)
      }));

      // Set totalItems after mapping
      this.totalItems = this.animals.length;

      this.filterByAnimalType(this.selectedAnimalType);

      // Call pagination to display the first page
      this.paginate();
    }, error => {
      console.error('There was an error!', error);
    });
  }


  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.paginatedAnimals = this.filteredAnimals.slice(startIndex, endIndex);
}



  changePage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }


  getImageUrlForAnimal(animalType: string): string {
    const imageUrls = {
      cow: '/assets/images/cow.png',
      sheep: '/assets/images/sheep.svg',
      goat: '/assets/images/goat.png'
    };

    const key = animalType.toLowerCase();
    if (key in imageUrls) {
      return imageUrls[key as keyof typeof imageUrls];
    } else {
      return 'default-image-url.jpg';
    }
  }


  buyAnimal(animal: Animal): void {
    //console.log('Buying', animal);
  
    // Create a CartItem with the selected animal's type, price, image, description, and quantity
    const cartItem: CartItem = {
      type: animal.type,
      price: animal.price,
      imageUrl: animal.imageUrl,
      description: animal.description,
      quantity: 1,
      total: animal.price,
    };
  
    // Use the CartService to add the item to the cart
    this.cartService.addItemToCart(cartItem);
    //console.log(cartItem);
  }
  

  filterByAnimalType(animalType: string): void {
    // Reset the current page to 1
    this.currentPage = 1;
    this.selectedAnimalType = animalType;
  
    // Filter the animals by the selected animal type
    if (this.selectedAnimalType === 'all') {
      // If 'All' is selected, show all animals
      this.filteredAnimals = this.animals;
    } else {
      // Filter by the selected animal type
      this.filteredAnimals = this.animals.filter(
        (animal) =>
          animal.type.toLowerCase() === this.selectedAnimalType.toLowerCase()
      );
    }
  
    // Update the totalItems to reflect the number of filtered animals
    this.totalItems = this.filteredAnimals.length;
  
    // Call paginate() to display the first page of filtered results
    this.paginate();
  }
  
}
