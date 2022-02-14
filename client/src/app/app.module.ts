import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './comp/login/login.component';
import { RegisterComponent } from './comp/register/register.component';
import { LoadingPageComponent } from './comp/loading-page/loading-page.component';
import { HeaderComponent } from './comp/header/header.component';
import { ProductsComponent } from './comp/products/products.component';
import { CartComponent } from './comp/cart/cart.component';
import { EditComponent } from './comp/edit/edit.component';
import { MainComponent } from './comp/main/main.component';
import { PurchaseComponent } from './comp/purchase/purchase.component';
import { OrderComponent } from './comp/order/order.component';
import { AddComponent } from './comp/add/add.component';
import { ProductItemComponent } from './comp/product-item/product-item.component';
import { WelcomeComponent } from './comp/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './comp/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoadingPageComponent,
    HeaderComponent,
    ProductsComponent,
    CartComponent,
    EditComponent,
    MainComponent,
    PurchaseComponent,
    OrderComponent,
    AddComponent,
    ProductItemComponent,
    WelcomeComponent,
    CartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
