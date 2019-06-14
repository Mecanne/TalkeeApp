import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() url: string;
  @Input() name: string;
  @Input() description: string;
  @Input() id: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  verPerfil(id: any) {
    this.router.navigate(['profile/' + id]);
  }

}
