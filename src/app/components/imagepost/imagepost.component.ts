import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imagepost',
  templateUrl: './imagepost.component.html',
  styleUrls: ['./imagepost.component.css']
})
export class ImagepostComponent implements OnInit {

  @Input() UserName: string;
  @Input() ImgUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
