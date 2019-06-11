import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/register-model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      email: new FormControl('',
        [Validators.required, Validators.email]),
      password: new FormControl('',
        [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})')]),
      passwordConfirm: new FormControl('',
        [Validators.required])
    });
  }

  register(formValue: any) {
    const register = new RegisterModel();
    if (formValue.password === formValue.passwordConfirm) {
      register.email = formValue.email;
      register.password = formValue.password;
      register.passwordConfirm = formValue.passwordConfirm;
      this.userService.register(register);
    } else {
      this.toastr.error('¡Las contraseñas deben coincidir!');
    }
  }

  log(log: any){
    console.log(log);
  }

}
