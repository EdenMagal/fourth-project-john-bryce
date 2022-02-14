import { Injectable } from '@angular/core';
import { userInterface } from '../models/user.interface';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public _router: Router) { }

  user: userInterface | undefined;

  street: string = "";
  city: string = "";



  async login(username: string, password: string) {

    const res = await fetch('http://localhost:1000/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this.user = data;
      localStorage['userId'] = this.user?.idNumber;
      if (this.user?.role == "user") {
        this._router.navigateByUrl("landing/welcome");
      }
      else {
        this._router.navigateByUrl('/shopping');
      }
    }
    else {
      alert(data.err);
    }

  }

  async getUser() {
    if (localStorage['userId']) {
      const id = localStorage['userId'];
      const res = await fetch(`http://localhost:1000/users/getUser/${id}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.err) {
        this.user = data;
        this._router.navigateByUrl('/shopping');
      }
    }
  }

  async logout() {
    const res = await fetch('http://localhost:1000/users/logout', {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.status == 200) {
      this._router.navigateByUrl("landing/login");
      this.user = undefined;
      this.city = "";
      this.street = "";
      localStorage.clear();
    }
  }

  async register(firstName: string, lastName: string, username: string, idNumber: number, password: string, city: string, street: string) {

    const res = await fetch('http://localhost:1000/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, username, password, street, idNumber, city })
    });

    if (res.status == 201) {
      this._router.navigateByUrl("landing/login");
    }
    else {
      const data = await res.json();
      alert(data.err);
    }

  }

  async getShippingInfo() {
    const res = await fetch(`http://localhost:1000/users/shippingInfo`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.err) {
      this.city = data.city;
      this.street = data.street;
    }
    else {
      alert(data.err);
    }
  }

  async checkId(idNumber: number) {

    const res = await fetch(`http://localhost:1000/users/check/${idNumber}`);
    const data = await res.json();

    if (!data.err) {
      return true;
    }

    return false;
  }


}
