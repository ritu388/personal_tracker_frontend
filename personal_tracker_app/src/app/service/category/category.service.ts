import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiURL = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getCategoryList(){
    return this.http.get(`${this.apiURL}/category/getAllCategory`);
  }

  addCategory(obj: any){
    return this.http.post(`${this.apiURL}/category/addCategory`, obj);
  }

  updateCategory(Id: any, obj: any) {
    return this.http.put(`${this.apiURL}/category/updateCategory/${Id}`, obj);
  }

  getCategoryById(Id: any) {
    return this.http.get(`${this.apiURL}/category/getCategoryById/${Id}`);
  }

  deleteCategory(Id: any){
    return this.http.delete(`${this.apiURL}/category/deleteCategory/${Id}`);
  }
}
