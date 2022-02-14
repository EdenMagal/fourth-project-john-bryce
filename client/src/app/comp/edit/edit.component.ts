import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productInterface } from 'src/app/models/product.interface';
import { AdminService } from 'src/app/services/admin.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public _categories: CategoriesService, public _admin: AdminService) { }

  @Input()
  product: productInterface | undefined;

  @Output()
  closeEditEvent = new EventEmitter();

  ngOnInit(): void {
  }

  funcCloseEdit() {
    this.closeEditEvent.emit();
  }

}
