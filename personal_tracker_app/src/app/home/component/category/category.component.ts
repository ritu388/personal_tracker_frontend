import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throws } from 'assert';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService,
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
    this.spinner.show();
    this.service.getCategoryList().subscribe((res: any) => {
      if (res) {
        this.spinner.hide();
        this.categories = res.data;
      } else {
        this.spinner.hide();
        this.toster.error('Oops something went wrong while fetching data');
      }
    });
  }

  addCategory(){
    this.spinner.show();
    const obj = {
      name: this.newCategory.value.name,
      type: this.newCategory.value.type,
      description: this.newCategory.value.des
    }
    this.service.addCategory(obj).subscribe((res: any) => {
      if (res) {
        this.spinner.hide();
        this.categories = res.result;
        this.newCategory.reset();
        this.toster.success('Category added successfully');
        this.getCategoryList();
      } else {
        this.spinner.hide();
        this.toster.error('error while adding data');
      }
    });
  }

  deleteCategory(Id: any) {
    this.spinner.show();
    this.service.deleteCategory(Id).subscribe({
      next:(res: any) => {
        if (res) {
          this.spinner.hide();
          this.toster.success('Category deleted Successfully');
          this.getCategoryList();
        } else {
          this.spinner.hide();
          this.toster.error('error while deleting category');
        }
      },
      error: (er) => {
        this.spinner.hide();
        this.toster.error(er);
      }
    });
  }

  getCategoryById(Id: any) {
    this.spinner.show();
    this.service.getCategoryById(Id).subscribe((res: any) =>{
      if (res) {
        console.log(res);
        this.spinner.hide();
        this.newCategory.patchValue({
          name: res.data[0].name,
          type: res.data[0].type,
          des: res.data[0].description
        });

      } else {
        this.spinner.hide();
        this.toster.error('error while fetching data');
      }
    });
  }

}
