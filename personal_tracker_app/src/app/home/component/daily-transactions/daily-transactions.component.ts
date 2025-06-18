import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService,
    private toster: ToastrService
  ) {
    this.currentLogin = localStorage.getItem('loginId');
  }

  ngOnInit(): void {
    this.dailyExpenses = this.fb.group({});
    this.fields.forEach((field: any) => {
      this.dailyExpenses.addControl(
        field.name,
        this.fb.control('', field.required ? Validators.required : [])
      );
    });
    this.getAllExpenses();
    this.getCategoryList();
  }

  getAllExpenses() {
    this.spinner.show();
    this.service.getAllDailyExpenses(this.currentLogin).subscribe((res: any) => {
      if (res) {
        this.spinner.hide();
        this.expenses = res.data;
      } else {
        this.spinner.hide();
        this.toster.error('Oops something went wrong while fetching data');
      }
    });
  }


  onSubmit() {
    this.spinner.show();
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
            this.spinner.hide();
            this.dailyExpenses.reset();
            this.getAllExpenses();
            this.toster.success('expenses are added');
          } else {
            this.spinner.hide();
            this.toster.error('error while adding expenses');
          }
        },
        error: (er) => {
          this.spinner.hide();
          this.toster.error('error while adding expenses', er);
        }
      });
    }
  }

  getCategoryList() {
    this.spinner.show();
    this.category.getCategoryList().subscribe({
      next: (res: any) => {
        if (res) {
          this.spinner.hide();
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
    this.spinner.show();
    this.service.deleteExpenses(Id).subscribe({
      next: (res: any) => {
        if (res) {
          this.spinner.hide();
          this.toster.success('expenses are deleted successfully');
          this.getAllExpenses();
        } else {
          this.spinner.hide();
          this.toster.error('error while deleting expenses');
        }
      },
      error: (er) => {
        this.spinner.hide();
        this.toster.error(er);
      }
    });
  }

  getDailyExpenseById(Id: any) {
    this.spinner.show();
    this.service.getExpensesById(Id).subscribe((res: any) => {
      if (res) {
        this.spinner.hide();
        this.dailyExpenses.patchValue({
          date: this.formatDateToInput(res.data.date),
          amount: res.data.amount,
          description: res.data.description,
          category_id: res.data.category_id,
        });
      } else {
        this.spinner.hide();
        this.toster.error('error while fetching data');
      }
    });
  }

  formatDateToInput(dateStr: string): string {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
