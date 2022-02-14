import { Component, Input, OnInit } from '@angular/core';
import { cartItemInterface } from 'src/app/models/cartItem.interface';
import { productInterface } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(public _cart : CartService) { }

  @Input()
  product: cartItemInterface | undefined

  ngOnInit(): void {
  }

}
