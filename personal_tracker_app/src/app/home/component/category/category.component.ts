import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throws } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category/category.service';
interface Category {
  id: Number,
  name: String,
  type: any,
  description: String
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
 categories: any = [];
  newCategory!: FormGroup;
  
  constructor(
    private service: CategoryService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.newCategory = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      des: new FormControl('', [Validators.required])
    });
  }

  getCategoryList(){
    this.service.getCategoryList().subscribe((res: any) => {
      if (res) {
        this.categories = res.data;
      } 
    });
  }

  addCategory(){
    const obj = {
      name: this.newCategory.value.name,
      type: this.newCategory.value.type,
      description: this.newCategory.value.des
    }
    this.service.addCategory(obj).subscribe((res: any) => {
      if (res) {
        this.categories = res.result;
        this.toster.success('data added successfully');
        this.getCategoryList();
      } else {
        this.toster.error('error while adding data');
      }
    });
  }

}
