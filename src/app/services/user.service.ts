import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register-model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  register(register: RegisterModel) {
    this.http.post(environment.API_URL + 'auth/register', register)
      .subscribe(resp => {
        this.toastr.success('Register succestul!');
        this.router.navigate(['login']);
      }, error => {
        console.log(error);
        this.toastr.error('Register failed!');
      });
  }

  deleteUser(user: UserModel) {
    this.http.delete(environment.API_URL + 'user/delete');
  }
}
