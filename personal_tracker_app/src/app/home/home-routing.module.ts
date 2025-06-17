import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoryComponent } from './component/category/category.component';
import { MonthlyIncomeComponent } from './component/monthly-income/monthly-income.component';
import { DailyTransactionsComponent } from './component/daily-transactions/daily-transactions.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'Category', component: CategoryComponent },
    { path: 'Monthly-Income', component: MonthlyIncomeComponent},
    { path: 'Daily-Expenses', component: DailyTransactionsComponent} ]
 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
