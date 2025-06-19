import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isMinimized = false;
  selectedComponent: any = 'Dashboard';
  loginDetails: any = localStorage.getItem('full_name');
  sidebarJson: any = [
    {
      Id: 1, menuName: 'Dashboard', icon: 'bi bi-speedometer2',
      routerLink: 'home/Dashboard'
    },
    {
      Id: 2, menuName: 'Monthly Income', icon: 'bi bi-cash-stack', routerLink: 'home/Monthly-Income'
    },
    {
      Id: 3, menuName: 'Daily Transactions', icon: 'bi bi-receipt', routerLink: 'home/Daily-Expenses'
    },
    {
      Id: 4, menuName: 'Category', icon: 'bi bi-tags', routerLink: 'home/Category'
    },
  ]
  filteredSidebar: any = [];
  constructor(
    private router: Router,
    private toster: ToastrService
  ) { }

  ngOnInit() {
  }


  navigateTOComponent(path: any, menuName: any) {
    this.selectedComponent = menuName;
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('full_name');
    localStorage.removeItem('loginId');
    localStorage.removeItem('mobile_no');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toster.success('logout successfully');
  }
}
