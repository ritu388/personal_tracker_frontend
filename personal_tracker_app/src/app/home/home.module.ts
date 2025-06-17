import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoryComponent } from './component/category/category.component';
import { DailyTransactionsComponent } from './component/daily-transactions/daily-transactions.component';
import { MonthlyIncomeComponent } from './component/monthly-income/monthly-income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    CategoryComponent,
    DailyTransactionsComponent,
    MonthlyIncomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class HomeModule { }
