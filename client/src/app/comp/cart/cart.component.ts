import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public _cart: CartService, public _users: UsersService, public _router: Router) { }

  async ngOnInit(): Promise<void> {
    if (this._users.user?.role == "user") {
      await this._cart.getCart();

      this._cart.getCartProducts();
    }
  }

  goToOrder() {
    this._router.navigateByUrl('/order');
  }

}
