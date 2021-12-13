import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: any;
  invalidLogin:Boolean;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private loginUser: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.isLogin())
  }

  onSubmit() {
    this.userData = this.loginUser.login(this.loginForm.value);
    console.log(this.userData.token);
    if(this.userData) {
      this.invalidLogin = false;
      console.log(localStorage.getItem('token'))
      this.router.navigate(['blog/manage']);
    } else {
      this.invalidLogin = true;
    }
  }

}
