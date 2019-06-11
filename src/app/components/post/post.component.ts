import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() UserName: string;
  @Input() Content: string;
  @Input() Url: string;
  @Input() type: string;
  @Input() date: Date;

  formTexto: FormGroup;
  formImagen: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formTexto = this.fb.group({
      texto: ['', Validators.required]
    });
    this.formImagen = this.fb.group({
      imagen: null,
      texto: ''
    });
  }

}
