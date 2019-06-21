import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {

  id: any;
  users: any;
  loadComplete: boolean;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userService.getFollows(this.id)
      .subscribe((resp: any) => {
        this.users = resp && resp.length ? resp.map(r => r as UserModel) : [];
        console.log(this.users);
        this.loadComplete = true;
      }, error => {
        this.loadComplete = true;
      });
  }

}
