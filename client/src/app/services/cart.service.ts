import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { cartItemInterface } from '../models/cartItem.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public _users: UsersService) { }

  cartStatus: string = "";
  cartProducts: cartItemInterface[] = [];
  cartId: number = 0;
  cartTotal: number = 0;

  toShowCart: boolean = false;

  showCart() {
    if (this._users.user?.role == "user") {
      this.toShowCart = !this.toShowCart;
    }
    else {
      this.toShowCart = false;
    }
  }

  async getCartStatus() {
    const res = await fetch(`http://localhost:1000/carts/cartStatus`, {
      credentials: 'include'
    });
    const data = await res.json();
    this.cartStatus = data.msg;
  }

  async getCart() {
    const res = await fetch(`http://localhost:1000/carts/getCart`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this.cartId = data.cartId;
    }
    else {
      alert(data.err);
    }
  }

  async addToCart(productId: number | undefined, amount: number) {
    const res = await fetch(`http://localhost:1000/carts/addToCart`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ productId, amount, customerId: this._users.user?.idNumber }),
      credentials: 'include'
    });

    if (res.status == 201) {
      this.getCartProducts();
    }
    else {
      const data = await res.json();
      alert(data.err);
    }
  }

  async getCartProducts() {
    const res = await fetch(`http://localhost:1000/carts/cartProducts/${this.cartId}`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this.cartProducts = data;
      this.getCartTotal();
    }
    else {
      alert(data.err);
    }
  }

  async getCartTotal() {
    const res = await fetch(`http://localhost:1000/carts/cartTotal/${this.cartId}`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this.cartTotal = data.total;
    }
    else {
      alert(data.err);
    }
  }

  async removeItem(productId: number | undefined) {
    const res = await fetch(`http://localhost:1000/carts/removeItem/${this.cartId}/${productId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.status == 200) {
      this.getCartProducts();
      this.getCartTotal();
    }
    else {
      const data = await res.json();
      alert(data.err);
    }
  }

  async emptyCart() {
    const res = await fetch(`http://localhost:1000/carts/emptyCart/${this.cartId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.status == 200) {
      this.getCartProducts();
      this.getCartTotal();
    }
    else {
      const data = await res.json();
      alert(data.err);
    }
  }
}
