import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isMinimized = false;
  selectedComponent: any = 'Dashboard';
  loginDetails: any = [];
  sidebarJson: any = [
    {
      Id: 1, menuName: 'Dashboard', icon: 'bi bi-speedometer2',
      routerLink: 'home/Dashboard'
    },
    {
      Id: 2, menuName: 'Monthly Income', icon: 'bi bi-file-earmark-text', routerLink: 'home/Monthly-Income'
    },
    {
      Id: 3, menuName: 'Daily Transactions', icon: 'bi bi-file-earmark-text', routerLink: 'home/Daily-Expenses'
    },
    {
      Id: 4, menuName: 'Category', icon: 'bi bi-file-earmark-text', routerLink: 'home/Category'
    },
  ]
  filteredSidebar: any = [];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }


  navigateTOComponent(path: any, menuName: any) {
    this.selectedComponent = menuName;
    this.router.navigate([path]);
  }
}
