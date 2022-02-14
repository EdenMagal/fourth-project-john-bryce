import { Injectable } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor() { }

  amountOfOrders: number = 0;

  dateAvailable: boolean = false;

  async getAmountOfOrders() {
    const res = await fetch(`http://localhost:1000/orders/amountOfOrders`);
    const data = await res.json();
    if (data.orders) {
      this.amountOfOrders = data.orders;
    }
  }

  async order(city: string, street: string, shippingDate: string, cardInfo: number, price: number) {
    const res = await fetch(`http://localhost:1000/orders/order`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ city, street, shippingDate, cardInfo, price })
    });
    if (res.status == 201) {
      return "ok";
    }
    else {
      const data = await res.json();
      return data.err;
    }
  }

  async checkDate(date: string) {
    const res = await fetch(`http://localhost:1000/orders/isTheDateAvailable/${date}`, {
      credentials: 'include'
    });

    if (res.status == 200) {
      return false;
    }

    return true;

  }

}


