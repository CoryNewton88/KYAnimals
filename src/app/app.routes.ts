import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [ 
    { path: 'home', component: HomeComponent, title: "Home - KY Animals"},
    { path: 'products', component: ProductsComponent, title: "Products - KY Animals"},
    { path: 'cart', component: CartComponent, title: "Cart - KY Animals"},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'products/:animalType', component: ProductsComponent }, ];
