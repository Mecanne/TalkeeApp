import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../../models/user-model';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SecurityContext } from '@angular/compiler/src/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService, private fb: FormBuilder, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  url: string;
  imgurl: SafeUrl;
  user: any;
  formDatos: FormGroup;
  formEmail: FormGroup;
  formContrasenna: FormGroup;
  formEliminar: FormGroup;

  ngOnInit() {
    this.user = this.userService.getLocalUser();
    this.url = this.user.urlImagen;

    this.formDatos = this.fb.group({
      userName: new FormControl(this.user.UserName, [Validators.required]),
      description: new FormControl(this.user.Description, [Validators.required])
    });

    this.formEmail = this.fb.group({
      newEmail: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.formContrasenna = this.fb.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordConfirm: new FormControl('', [Validators.required])
    });

    this.formEliminar = this.fb.group({
      password: new FormControl('', [Validators.required])
    });
  }

  modifyUserData(formValue: any) {
    const user = this.user;
    user.UserName = formValue.userName;
    user.Description = formValue.description;
    this.modifyUser(user);
  }
  modifyUser(user: UserModel) {
    this.userService.modifyUser(user)
      .subscribe(resp => {
        this.toastr.success('Usuario modificado correctamente');
        this.userService.setLocalUser(user);
        this.user = this.userService.getLocalUser();
      }, error => {
        console.log(error);
        this.toastr.error('Error al modificar los datos del usuario');
      });
  }

  modifyUserPassword(formValue: any) {
    console.log(formValue);
  }

  modifyUserEmail(formValue: any) {
    console.log(formValue);
  }

  deleteAccount(formValue: any) {
    console.log(formValue);
  }

  actualizarUrl(url: string) {
    this.imgurl = this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
