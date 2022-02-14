import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public _users: UsersService) { }

  ngOnInit(): void {
  }

  step: boolean = true;
  step2: boolean = false;

  error: string = "";

  idNumber: number = 0;
  email: string = "";
  password: string = "";


  async step1(id: number, email: string, password: string, confirmPassword: string) {
    this.error = "";
    const checkId = await this._users.checkId(id);
    const checkEmail = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (checkId && checkEmail && password == confirmPassword) {
      this.step = false;
      this.step2 = true;
      this.idNumber = id;
      this.email = email;
      this.password = password;
    }
    else {
      if (!checkEmail) {
        this.error += "invalid email addres "
      }
      if (!checkId) {
        this.error += "id already exists "
      }
      if (password != confirmPassword) {
        this.error += "passwords don't match "
      }
    }
  }

  register(firstName: string, lastName: string, city: string, street: string) {

    this.error = "";

    if (!firstName || !lastName || !this.email || !this.password || !street || !this.idNumber || !city) {
      this.error += "Missing some info";
    }

    this._users.register(firstName, lastName, this.email, this.idNumber, this.password, city, street);

    this.email = "";
    this.idNumber = 0;
    this.password = "";

  }

}
