import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ) { }

  login(obj: any){
    return this.http.post(`${this.apiURL}/auth/login`, obj);
  }

  register(obj: any){
    return this.http.post(`${this.apiURL}/auth/register`, obj);
  }
}
