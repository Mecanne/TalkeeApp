import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  formBusqueda: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formBusqueda = this.fb.group({
      query: new FormControl('', [Validators.required, Validators.pattern('')])
    });
  }

}
