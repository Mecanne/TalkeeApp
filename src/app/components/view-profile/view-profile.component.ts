import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostModel } from 'src/app/models/post-model';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { Follows } from '../../models/follows';
import { ToastrService } from 'ngx-toastr';
import { FollowModel } from 'src/app/models/follow-model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute, private toastr: ToastrService) { }

  id: any;
  user: any;
  localuser: UserModel;
  posts = [];
  loadComplete: boolean;
  followed: boolean;
  followers: any;
  follows: any;

  ngOnInit() {
    this.loadComplete = false;
    this.followed = false;
    this.route.params.subscribe(param => {
      this.id = param['id'];
      this.user = this.userService.getUserProfile(this.id)
        .subscribe((resp: any) => {
          this.user = resp && resp.length ? resp.map(r => r as UserModel) : [];
          this.user = this.user[0];
          this.getAllUserPosts();
          this.localuser = this.userService.getLocalUser();
          this.userService.isFollowedByUser(this.localuser.UserID, this.user.userID)
            .subscribe((resp: boolean) => {
              this.followed = resp;
              this.loadComplete = true;
            });
        });
    });
  }

  follow() {
    const followModel = new FollowModel();
    followModel.UserID = this.localuser.UserID;
    followModel.FollowID = this.user.userID;
    console.log(followModel);
    this.userService.addFollow(followModel)
      .subscribe(resp => {
        this.toastr.success('Usuario seguido');
        this.followed = true;
      });
  }

  unfollow() {
    this.userService.deleteFollow(this.localuser.UserID, this.user.userID)
      .subscribe((resp: any) => {
        this.followed = false;
      }, error => {
        console.log(error);
      });
  }

  getAllUserPosts() {
    this.postService.getAllPost(this.id).subscribe((resp: any) => {
      this.posts = resp && resp.length ? resp.map(r => r as PostModel) : [];
      this.posts.map(post => {
        post.date = new Date(post.date).toLocaleString();
      });
    });
    this.userService.getFollowers(this.id).subscribe(
      (resp: any) => {
        this.followers = resp.length;
      },
      error => {
      }
    );
    this.userService.getFollows(this.id).subscribe(
      (resp: any) => {
        this.follows = resp.length;
      },
      error => {
      }
    );
  }

}
