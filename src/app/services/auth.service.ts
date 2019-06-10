import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  login(login: LoginModel) {
    this.http.post(environment.API_URL + 'auth/login', login)
      .subscribe(resp => {
        const token = (resp as any).token;
        window.localStorage.setItem('jwt', token);
        this.router.navigate(['home']);
        this.toastr.success('Login successful!');
      }, error => {
        this.toastr.error('Login failed!');
      });
  }

  logout() {
    window.localStorage.removeItem('jwt');
  }

  isAuthenticated() {
    return window.localStorage.getItem('jwt') !== null;
  }
}
