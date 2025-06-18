import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private service: LoginService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      loginId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(){
    this.spinner.show();
    let obj = {
      loginId: this.loginForm.value.loginId,
      password: this.loginForm.value.password
    }
    if (this.loginForm.valid) {
      this.service.login(obj).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('loginId', res.user.id);
          localStorage.setItem('full_name', res.user.full_name);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('mobile_no', res.user.mobile_no);
          this.spinner.hide();
          this.router.navigate(['home/Dashboard']);
          this.toster.success('login successfully');
        } else {
          this.spinner.hide();
          this.toster.error('error while login please check your password and loginId');
        }
      });
    } else {
      this.spinner.hide();
      this.toster.info('please fill required field');
    }
  }


}
