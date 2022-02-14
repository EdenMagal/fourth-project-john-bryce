import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemInterface } from 'src/app/models/cartItem.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {



  orderPopUp: boolean = false;
  error: string = "";
  productsInCart: cartItemInterface[] = [];
  totalPrice: number = 0;


  constructor(public _router: Router, public _cart: CartService, public _users: UsersService, public _orders: OrdersService) {

  }

  ngOnInit(): void {
    if (!this._users.user) {
      this._router.navigateByUrl('/landing/login');
    }
  }

  query: string | undefined;

  highlight(content: string) {
    if (!this.query) {
      return content;
    }
    return content.replace(new RegExp(this.query, "gi"), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }

  backToStore() {
    this._router.navigateByUrl('/shopping');
  }

  async order(city: string, street: string, date: string, creditCart: number) {

    if (!city || !street || !date || !creditCart) {
      return this.error = "Missing some Info";
    }

    const shippingDate = new Date(date).toLocaleDateString('en-IL').split("/").reverse().join("-");

    if (await this._orders.checkDate(shippingDate)) {
      return this.error = "There are too many orders set to this date, choose another";
    }

    if (creditCart.toString().length != 16) {
      return this.error = "incorrect credit card info"
    }
    let card: any = creditCart.toString().slice(12, 16);
    card = +card;

    this.productsInCart = this._cart.cartProducts;
    this.totalPrice = this._cart.cartTotal;

    const status = await this._orders.order(city, street, shippingDate, card, this._cart.cartTotal);

    if (status == "ok") {
      return this.orderPopUp = true;
    }

    return this.error = status;

  }

  onExportJson() {
    let data: string = '';
    for (let i = 0; i < this._cart.cartProducts.length; i++) {
      data += `\n Product ${i} : \n Product Name : ${this._cart.cartProducts[i].name}. \n amount : ${this._cart.cartProducts[i].amount}. \n price : ${this._cart.cartProducts[i].price}$. \n total price of product : ${this._cart.cartProducts[i].totalPrice}$`
      if (i + 1 == this._cart.cartProducts.length) {
        data += `\n Total Price : ${this.totalPrice}$`;
      }
    }
    let dataURI = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
    let exportFileName = 'recipt' + this._users.user?.idNumber + '.txt';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataURI);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }
}
