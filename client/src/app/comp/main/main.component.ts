import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public _cart: CartService, public _users: UsersService, public _router: Router, public _admin: AdminService, public _categories: CategoriesService, public _products: ProductsService) { }



  ngOnInit(): void {
    this._categories.getCategories();
    if (!this._users.user) {
      this._router.navigateByUrl("/landing/login");
    }
    if (this._users.user?.role == "user") {
      this._cart.toShowCart = true;
    }
    else {
      this._cart.toShowCart = false;
    }
  }

}
