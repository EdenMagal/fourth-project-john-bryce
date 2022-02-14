import { Component, Input, OnInit } from '@angular/core';
import { productInterface } from 'src/app/models/product.interface';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product: productInterface | undefined

  constructor(public _users: UsersService, public _cart: CartService, public _admin: AdminService) { }

  openAmount: boolean = false;
  openEdit: boolean = false;


  ngOnInit(): void {
  }

  funcOpenEdit() {
    this.openEdit = true;
  }

  funcCloseEdit() {
    this.openEdit = false;
  }

  funcOpenAmount() {
    this.openAmount = true;
  }

  funcCloseAmount() {
    this.openAmount = false;
  }

  addToCart(amount: number) {
    this._cart.addToCart(this.product?.productId, amount);
    this.openAmount = false;
  }

}
