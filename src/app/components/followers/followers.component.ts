import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  id: any;
  users: any;
  loadComplete: boolean;
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.loadComplete = false;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userService.getFollowers(this.id)
      .subscribe((resp: any) => {
        this.users = resp && resp.length ? resp.map(r => r as UserModel) : [];
        this.user = this.userService.getUser(this.id)
          .subscribe((resp: any) => {
            const users = resp && resp.length ? resp.map(r => r as UserModel) : [];
            this.user = users[0];
          }, error => {
            console.log(error);
          });
        this.loadComplete = true;
      }, error => {
        this.loadComplete = true;
      });
  }

}
