import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from '../products/products.component';
import { CartComponent } from '../cart/cart.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    NavigationComponent,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [
    CommonModule,
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    NavigationComponent,
    HttpClientModule,
    AppRoutingModule,

  ]
})
export class SharedModule { }
