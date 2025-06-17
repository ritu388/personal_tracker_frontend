import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyExpansesService {

  apiURL = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAllDailyExpenses(Id: any){
    return this.http.get(`${this.apiURL}/budget/getAllBudget/${Id}`);
  }

  addExpenses(Obj: any) {
    return this.http.post(`${this.apiURL}/budget/addBudget`, Obj);
  }

  updateExpenes(Id: any, Obj: any) {
    return this.http.put(`${this.apiURL}/budget/updateBudget/${Id}`, Obj);
  }

  getExpensesById(Id: any) {
    return this.http.get(`${this.apiURL}/budget/getBudgetById/${Id}`);
  }

  deleteExpenses(Id: any) {
    return this.http.delete(`${this.apiURL}/budget/deleteBudget/${Id}`);
  }
}
