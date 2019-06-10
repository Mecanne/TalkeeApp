import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LoginModel } from '../../models/login-model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    } else {
      this.formLogin = this.fb.group({
        email: ['', Validators.email],
        password: ''
      });
    }
  }

  login(formValue: any) {
    const login = new LoginModel();
    login.email = formValue.email;
    login.password = formValue.password;
    this.authService.login(login);
  }

}
