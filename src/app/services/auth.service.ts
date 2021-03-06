import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
// tslint:disable-next-line: max-line-length
  canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean | import('@angular/router').UrlTree | import('rxjs').Observable<boolean | import('@angular/router').UrlTree> | Promise<boolean | import('@angular/router').UrlTree> {
    return this.isAuthenticated();
  }

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private userService: UserService) { }

  login(login: LoginModel) {
    this.http.post(environment.API_URL + 'auth/login', login)
      .subscribe(resp => {
        const token = (resp as any).token;
        let userlog = (resp as any).userlog;
        window.localStorage.setItem('jwt', token);
        userlog = JSON.parse(userlog) as UserModel;
        this.userService.setLocalUser(userlog);
        this.router.navigate(['home']);
        this.toastr.success('¡Incio de sesión correcto!');
      }, error => {
        this.toastr.error('¡Error al iniciar sesión!');
      });
  }

  logout() {
    window.localStorage.removeItem('jwt');
  }

  isAuthenticated() {
    return window.localStorage.getItem('jwt') !== null;
  }
}
