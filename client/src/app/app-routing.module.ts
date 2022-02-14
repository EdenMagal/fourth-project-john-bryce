import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPageComponent } from './comp/loading-page/loading-page.component';
import { LoginComponent } from './comp/login/login.component';
import { MainComponent } from './comp/main/main.component';
import { OrderComponent } from './comp/order/order.component';
import { RegisterComponent } from './comp/register/register.component';
import { WelcomeComponent } from './comp/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'landing', component: LoadingPageComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'welcome', component: WelcomeComponent }
    ]
  },
  { path: 'shopping', component: MainComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', redirectTo: 'landing/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
