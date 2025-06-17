import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category/category.service';
import { DailyExpansesService } from 'src/app/service/daily-expanses/daily-expanses.service';

@Component({
  selector: 'app-daily-transactions',
  templateUrl: './daily-transactions.component.html',
  styleUrls: ['./daily-transactions.component.css']
})
export class DailyTransactionsComponent implements OnInit {
 dailyExpenses!: FormGroup;
 expenses: any = [];
 categories: any = [];
 fields: any[] = [
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'amount', label: 'Amount', type: 'number' },
  { name: 'description', label: 'Description' },
  { name: 'category_id', label: 'Select Category', type: 'select', option: [] }
];
 
 currentLogin: any;
  constructor(
    private service: DailyExpansesService,
    private category: CategoryService,
    private fb: FormBuilder,
    private toster: ToastrService
  ) {
    this.currentLogin = localStorage.getItem('loginId');
  }

  ngOnInit(): void {
    this.dailyExpenses = this.fb.group({}); // Initialize once
    this.fields.forEach((field: any) => {
      this.dailyExpenses.addControl(
        field.name,
        this.fb.control('', field.required ? Validators.required : [])
      );
    });
    this.getAllExpenses();
    this.getCategoryList();
  }

  getAllExpenses(){
    this.service.getAllDailyExpenses(this.currentLogin).subscribe((res: any) => {
      if (res) {
        this.expenses = res.data;
      }
    });
  }

 
  onSubmit(){
    let obj = {
      date: this.dailyExpenses.value.date,
      amount: this.dailyExpenses.value.amount,
      description: this.dailyExpenses.value.description,
      category_id: this.dailyExpenses.value.category_id,
      user_id: this.currentLogin,
    }
    if (this.dailyExpenses.valid) {
      this.service.addExpenses(obj).subscribe({
        next: (res: any) => {
          if (res) {
            this.toster.success('expenses are added', res);
          } else {
            this.toster.error('error while adding expenses');
          }
        },
        error: (er) => {
          this.toster.error('error while adding expenses', er);
        }
      });
    }
  }

  getCategoryList(){
    this.category.getCategoryList().subscribe({
      next: (res: any) => {
        if (res) {
          let categories = res.data;
          this.fields = this.fields.map((field: any) => {
            if (field.name === 'category_id') {
              field.option = categories.map((cat: any) => ({
                value: cat.id,
                viewValue: cat.type
              }))
            }
            return field;
          });
        }
      }
    });
  }

  deleteExpenses(Id: any) {
    this.service.getExpensesById(Id).subscribe({
      next: (res: any) => {
        if (res) {
          this.toster.success('expenses are deleted successfully');
        } else {
          this.toster.error('error while deleting expenses');
        }
      },
      error: (er) => {
        this.toster.error(er);
      }
    });
  }
}
