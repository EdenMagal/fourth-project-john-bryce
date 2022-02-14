import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public _products: ProductsService, public _cart: CartService, public _users: UsersService) { }

  ngOnInit(): void {
    this._products.getAllProducts();
  }

}
