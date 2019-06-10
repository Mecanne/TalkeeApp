import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = [{UserName: 'Name', Content: 'Content'}, {UserName: 'Name', Content: 'Content'}, {UserName: 'Name', Content: 'Content'}];

  constructor() { }

  ngOnInit() {
  }

}
