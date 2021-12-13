import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiTGVzdGVyIEphaW5hciIsImFkbWluIjp0cnVlfQ.sYnBGVOmUXJ2IfCFuMWyl7Qy6f3Wd7pfdPf5_-oyl80';
  private isUserLogin = false;

  constructor() { }


  // Note: this is just a fake service for login and logout

  login(credentials: {email: String, password: String}) {
    if (credentials.email === 'lester@gmail.com' && credentials.password === '1234'){
      localStorage.setItem('token', this.sampleToken);
      this.isUserLogin = true;
      return true;
    } else {
      this.isUserLogin = false;
      return false;
    } 
  }

  logout(){
    localStorage.removeItem('token');
    this.isUserLogin = false;
  }
   isLogin() {
    return this.isUserLogin;
   }
}


