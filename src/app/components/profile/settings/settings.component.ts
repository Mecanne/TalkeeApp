import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService, private fb: FormBuilder) { }

  user: any;
  formDatos: FormGroup;
  formEmail: FormGroup;
  formContraseña: FormGroup;
  formEliminar: FormGroup;

  ngOnInit() {
    this.user = this.userService.getUser();

    this.formDatos = this.fb.group({
      username: new FormControl(this.user.UserName),
      description: new FormControl(this.user.Description)
    });
    this.formEmail = this.fb.group({

    });
    this.formContraseña = this.fb.group({

    });
    this.formEliminar = this.fb.group({

    });
  }

}
