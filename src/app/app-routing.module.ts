import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - KY Animals"},
  { path: 'products', component: ProductsComponent, title: "Products - KY Animals"},
  { path: 'cart', component: CartComponent, title: "Cart - KY Animals"},
  { path: 'products/:animalType', component: ProductsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
