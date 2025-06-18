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
  categories: any = [];
  dailyTransactions: any[] = [];

  constructor(private service: DashboardService) { }
  ngOnInit() {
    this.getMonthlySummary();
  }

  getMonthlySummary() {
    this.service.getMonthlySummary(localStorage.getItem('loginId')).subscribe((res: any) => {
      if (res && res?.data) {
        this.categories = res.data;
        this.dailyTransactionsCount = res.data.length;

        let totalSpent = 0;
        let latestBalance = 0;

        for (let i of res.data) {
          totalSpent += Number(i.total_per_category || 0);
          latestBalance = Number(i.daily_balance || 0);
        }

        this.dailyTotal = totalSpent;
        this.totalBalance = latestBalance;
      }
    });
  }


}
