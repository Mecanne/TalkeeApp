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

  modifyUser(user: UserModel) {
    const currentUser = this.getLocalUser();
    return this.http.put(environment.API_URL + 'User/' + currentUser.UserID, user);
  }

  deleteUser(user: UserModel) {
    return this.http.delete(environment.API_URL + 'user/delete');
  }

  getUserID() {
    return window.localStorage.getItem('userid');
  }

  getUser(id) {
    this.http.get(environment.API_URL + 'User/byid?id=' + id)
      .subscribe(resp => {
        console.log(resp);
        return resp[0];
      }, error => {
        console.log(error);
      });
  }

  getUserProfile(id) {
    return this.http.get(environment.API_URL + 'User/byid?id=' + id);
  }

  getLocalUser() {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  setLocalUser(user: UserModel) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  searchUsers(query: string) {
    return this.http.get(environment.API_URL + 'User/search?q=' + query);
  }

  getFollowers(id: any) {
    
  }

  getFollows(id: any) {
    
  }

}
