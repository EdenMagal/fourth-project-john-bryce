import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public _products: ProductsService) { }

  openAdd: boolean = false;

  async addProduct(name: string, price: number, imgUrl: string, categoryId: number) {
    const res = await fetch(`http://localhost:1000/admin/addProduct`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, price, imgUrl, categoryId }),
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this._products.products = data;
      this.funcCloseAdd();
    }
    else {
      alert(data.err);
    }
  }

  funcOpenAdd() {
    this.openAdd = true;
  }

  funcCloseAdd() {
    this.openAdd = false;
  }



  async editProduct(productId: number | undefined, name: string, price: number, imgUrl: string, categoryId: number) {
    const res = await fetch(`http://localhost:1000/admin/edit/${productId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, price, imgUrl, categoryId }),
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this._products.products = data
    }
    else {
      alert(data.err);
    }
  }
}
