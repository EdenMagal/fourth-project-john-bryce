import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  constructor(public _products: ProductsService, public _orders: OrdersService) { }

  ngOnInit(): void {
    this._products.getAmountOfProducts();
    this._orders.getAmountOfOrders();
  }

}
