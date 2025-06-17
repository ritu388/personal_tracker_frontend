import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dailyTransactionsCount: number = 0;
  dailyTotal: number = 0;
  totalBalance: number = 0;
  categories:any = [];
  dailyTransactions: any[] = [];

  constructor(private service: DashboardService) { }
  ngOnInit() {
    this.getMonthlySummary();
  }

  getMonthlySummary() {
    this.service.getMonthlySummary(localStorage.getItem('loginId')).subscribe((res: any) => {
      if (res && res?.data) {
        this.categories = res.data;
        console.log('catrgory', this.categories);
        let dailyExpnese: any = [];
       for (let i of res.data) {
        dailyExpnese = [{
          category: i.category,
          daily_expense: i.total_per_category,
          totalBalance: i.daily_balance
        }];
       }
       this.dailyTransactionsCount = res.data.length;
       for (let i of dailyExpnese) {
        this.totalBalance = i.totalBalance; 
       }
      
      }
    })
  }
}
