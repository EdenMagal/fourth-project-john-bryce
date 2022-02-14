import { Injectable } from '@angular/core';
import { productInterface } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  products: productInterface[] = [];
  product: productInterface | undefined;

  amountOfProducts: number = 0;

  async getAllProducts() {
    const res = await fetch(`http://localhost:1000/products/allProducts`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (data.length) {
      this.products = data
    }
  }

  async getProductsByCategory(categoryId: number) {
    const res = await fetch(`http://localhost:1000/products/byCategory/${categoryId}`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (data.length) {
      this.products = data;
    }
    else {
      alert(data);
    }
  }

  async getAmountOfProducts() {
    const res = await fetch('http://localhost:1000/products/amountOfProducts');
    const data = await res.json();

    if (data.products) {
      this.amountOfProducts = data.products;
    }
    else {
      alert(data);
    }
  }

  async searchProducts(name: string) {
    const res = await fetch(`http://localhost:1000/products/searchProduct/${name}`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this.products = data;
    }
    else {
      alert(data.err);
    }
  }

  async getProduct(productId: number) {
    const res = await fetch(`http://localhost:1000/products/product/${productId}`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this.product = data;
    }
    else {
      alert(data.err);
    }
  }
}
