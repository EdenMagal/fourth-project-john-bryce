import { Injectable } from '@angular/core';
import { categoryInterface } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  categories: categoryInterface[] = [];

  async getCategories() {

    const res = await fetch('http://localhost:1000/categories/categories', {
      credentials: 'include'
    });
    const data = await res.json();

    if (data.length) {
      this.categories = data;
    }

  }

}
