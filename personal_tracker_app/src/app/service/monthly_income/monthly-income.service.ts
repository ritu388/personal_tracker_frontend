import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyIncomeService {

  apiURL = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAllMonthlyList(id: any){
    return this.http.get(`${this.apiURL}/monthly/getAllMonthly_budget/${id}`);
  }

  addMonthlySalary(obj: any) {
    return this.http.post(`${this.apiURL}/monthly/addMonthlyBudget`, obj);
  }

  getMonthlySalaryById(Id: any) {
   return this.http.get(`${this.apiURL}/monthly/getMonthly_budgetById/${Id}`); 
  } 

  getCategoryList(){
    return this.http.get(`${this.apiURL}/category/getAllCategory`);
  }

  deleteMonthlySalary(Id: any) {
    return this.http.delete(`${this.apiURL}/monthly/deleteMonthly_budget/${Id}`);
  }
  
}
