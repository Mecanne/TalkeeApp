import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { UserModel } from "../../../models/user-model";
import { ToastrService } from "ngx-toastr";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { SecurityContext } from "@angular/compiler/src/core";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  url: string;
  imgurl: SafeUrl;
  user: any;
  formDatos: FormGroup;
  formEmail: FormGroup;
  formContrasenna: FormGroup;
  formEliminar: FormGroup;
  formUrl: FormGroup;

  ngOnInit() {
    this.user = this.userService.getLocalUser();
    this.url = this.user.urlImagen;

    this.formDatos = this.fb.group({
      userName: new FormControl(this.user.UserName, [Validators.required]),
      description: new FormControl(this.user.Description, [Validators.required])
    });

    this.formUrl = this.fb.group({
      url: new FormControl("", [Validators.required])
    });

    this.formEmail = this.fb.group({
      newEmail: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [Validators.required])
    });

    this.formContrasenna = this.fb.group({
      currentPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
      newPasswordConfirm: new FormControl("", [Validators.required])
    });

    this.formEliminar = this.fb.group({
      password: new FormControl("", [Validators.required])
    });
  }

  modifyUserData(formValue: any) {
    const user = this.user;
    user.UserName = formValue.userName;
    user.Description = formValue.description;
    this.userService.modifyUser(user).subscribe(
      resp => {
        this.toastr.success("Usuario modificado correctamente");
        this.userService.setLocalUser(user);
        this.user = this.userService.getLocalUser();
      },
      error => {
        console.log(error);
        this.toastr.error("Error al modificar los datos del usuario");
      }
    );
  }

  modifyUserPassword(formValue: any) {
    const user = this.user;
    if (formValue.currentPassword === user.Password) {
      if (formValue.newPassword === formValue.newPasswordConfirm) {
        user.Password = formValue.newPassword;
        this.userService.modifyUser(user).subscribe(
          resp => {
            this.toastr.success("Contraseña modificada correctamente");
            this.userService.setLocalUser(user);
            this.user = this.userService.getLocalUser();
          },
          error => {
            console.log(error);
            this.toastr.error("Error al modificar los datos del usuario");
          }
        );
      } else {
        this.toastr.error("¡Las contraseñas deben coincidir!");
      }
    } else {
      this.toastr.error("¡La contraseña es incorrecta!");
    }
  }

  modifyUserEmail(formValue: any) {
    const user = this.user;
    if (formValue.password === user.Password) {
      user.Email = formValue.newEmail;
      this.userService.modifyUser(user).subscribe(
        resp => {
          this.toastr.success('Email modificado correctamente');
          this.userService.setLocalUser(user);
          this.user = this.userService.getLocalUser();
        },
        error => {
          console.log(error);
          this.toastr.error('Error al modificar los datos del usuario');
        }
      );
    } else {
      this.toastr.error('Contraseña incorrecta');
    }
  }

  modifyImgurl(formValue: any) {
    const user = this.user;
    user.urlImagen = formValue.url;
    this.userService.modifyUser(user).subscribe(
      resp => {
        this.toastr.success('Imagen de perfil modificada correctamente');
        this.userService.setLocalUser(user);
        this.user = this.userService.getLocalUser();
      },
      error => {
        console.log(error);
        this.toastr.error('Error al modificar los datos del usuario');
      }
    );
  }

  deleteAccount(formValue: any) {
    const user = this.user;
    if (formValue.password === user.Password) {
      user.Email = formValue.newEmail;
      this.userService.deleteUser(user.UserID);
      this.authService.logout();
    } else {
      this.toastr.error('Contraseña incorrecta');
    }
  }

  actualizarImagen(formValue: any) {
    this.url = formValue.url;
  }
}
