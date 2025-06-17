import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MonthlyIncomeService } from 'src/app/service/monthly_income/monthly-income.service';

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.css']
})
export class MonthlyIncomeComponent implements OnInit {
  form!: FormGroup;
  fields: any = [
    { name: 'category_id', label: 'Category', type: 'select', required: true, option: [] },
    { name: 'month', label: 'Month (Year)', type: 'number', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'salary', label: 'Salary', type: 'number', step: '0.01', required: true }
  ];
  monthlyList: any = [];
  categoryList: any = [];
  currentLogin: any;

  constructor(
    private fb: FormBuilder,
    private toster: ToastrService,
    private service: MonthlyIncomeService) {

    this.form = this.fb.group({});
    this.fields.forEach((field: any) => {
      this.form.addControl(
        field.name,
        this.fb.control('', field.required ? Validators.required : [])
      );
    });
  }

  ngOnInit(): void {
    this.currentLogin = localStorage.getItem("loginId");
    this.getCategoryList();
    this.getAllMonthlyList();
  }


  getCategoryList() {
    this.service.getCategoryList().subscribe({
      next: (res: any) => {
        if (res) {
          let categoryList = res.data;
          this.fields = this.fields.map((field: any) => {
            if (field.name === 'category_id') {
              field.option = categoryList.map((cat: any) => ({
                value: cat.id,
                viewValue: cat.type
              }));
            }
            return field;
          });
        }
      }
    });
  }

  onSubmit() {
    let obj = {
      user_id: this.currentLogin,
      category_id: parseInt(this.form.value.category_id),
      month: this.form.value.month,
      year: this.form.value.year,
      salary: this.form.value.salary,
    }
    if (this.form.valid) {
      this.service.addMonthlySalary(obj).subscribe({
        next: (res: any) => {
          if (res) {
            this.toster.success('monthly salary added successfully');
          } else {
            this.toster.error('error while adding salary');
          }
        },
        error: (er) => {
          this.toster.error(er);
        }
      });
    }
  }

  getAllMonthlyList(){
    this.service.getAllMonthlyList(this.currentLogin).subscribe({
      next: (res: any) => {
        if (res) {
          this.monthlyList = res.data;
        }
      }
    });
  }

  deleteMonthlySalary(Id: any) {
    this.service.deleteMonthlySalary(Id).subscribe((res: any) => {
      if (res) {
        this.toster.success('monthly salary deleted successfully');
        this.getAllMonthlyList();
      } else {
        this.toster.error('error while deleting salary');
      }
    });
  }
}
