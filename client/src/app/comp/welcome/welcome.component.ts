import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public _users: UsersService, public _cart: CartService, public _router: Router) { }

  async ngOnInit(): Promise<void> {
    if (this._users.user) {
      if (this._users.user?.role == "user") {
        await this._cart.getCartStatus();
        await this._cart.getCart();
        this._cart.getCartTotal();
      }
    }
    else {
      this._router.navigateByUrl('/landing/login');
    }
  }

  toTheShop() {
    this._router.navigateByUrl("/shopping");
  }

}
