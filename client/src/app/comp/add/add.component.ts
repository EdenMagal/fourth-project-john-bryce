import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public _categories: CategoriesService, public _admin: AdminService) { }

  ngOnInit(): void {
  }

}
