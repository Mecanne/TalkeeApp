import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostModel } from 'src/app/models/post-model';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute) { }

  id: any;
  user: any;
  posts = [];

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.id = param['id'];
      this.user = this.userService.getUserProfile(this.id)
        .subscribe((resp: any) => {
          this.user = resp && resp.length ? resp.map(r => r as UserModel) : [];
          this.user = this.user[0];
          this.getAllUserPosts();
        });
    });
  }

  getAllUserPosts() {
    this.postService.getAllPost(this.id)
      .subscribe((resp: any) => {
        this.posts = resp && resp.length ? resp.map(r => r as PostModel) : [];
        this.posts.map(post => {
          post.date = new Date(post.date).toLocaleString();
        });
      });
  }

}
