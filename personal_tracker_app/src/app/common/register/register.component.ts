import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitForm: boolean = false;
  msg: any;
  constructor(
    private service: LoginService,
    private router: Router,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      mobile_no: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)])
    });
  }

  onSubmit(){
    this.spinner.show();
    this.submitForm = true;
    let obj = {
      full_name: this.registerForm.value.full_name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      mobile_no: this.registerForm.value.mobile_no 
    }
    console.log('check form', this.registerForm);
    if (this.registerForm.valid) {
      this.service.register(obj).subscribe({
        next: (res: any) => {
          if (res) {
            this.spinner.hide();
            this.toster.success("Registration successfully");
            this.router.navigate(['login']);
          } else {
            this.spinner.hide();
            this.toster.error('errorr while registrations');
          }
        },
        error: (er) =>{
          this.spinner.hide();
          this.toster.error(er);
        }
      });
    } else {
      this.spinner.hide();
      this.toster.info('please fill the required fields');
    }
  } 

  matchPassword(value: any){
    if (value.target.value === this.registerForm.value.confirm_password) {
      return this.msg = '';
    } else {
      return this.msg = 'Password is not matched';
    }
  }
}
