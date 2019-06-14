import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  formBusqueda: FormGroup;
  query: string;

  constructor(private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.formBusqueda = this.fb.group({
      query: new FormControl('', [Validators.required, Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')])
    });
  }

  search(formValue: any) {
    this.router.navigate(['refreshsearch/' + encodeURI(formValue.query)]);
  }

}
