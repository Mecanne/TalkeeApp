import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-refresh-search',
  templateUrl: './refresh-search.component.html',
  styleUrls: ['./refresh-search.component.css']
})
export class RefreshSearchComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['search' + this.route.params['query']]);
  }

}
