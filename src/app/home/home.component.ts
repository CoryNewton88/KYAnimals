import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // ...

  constructor(private router: Router, private sharedService: SharedService) {}

  navigateToProducts(animalType: string): void {
    this.sharedService.setSelectedAnimalType(animalType);
    // Navigate to the products page using Angular Router
    this.router.navigate(['/products']);
  }
  
  ngAfterViewInit(): void {
    // Subscribe to selectedAnimalType$ and log its value when it changes
    this.sharedService.selectedAnimalType$.subscribe((animalType) => {
    });
  }
}

