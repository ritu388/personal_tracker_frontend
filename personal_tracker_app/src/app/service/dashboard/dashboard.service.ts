import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiURL = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getMonthlySummary(Id: any) {
    return this.http.get(`${this.apiURL}/monthly/getMonthlySummary/${Id}`);
  }
}
