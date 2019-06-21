import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { CompletePostModel } from 'src/app/models/complete-post-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private postService: PostService, private userService: UserService) { }

  callComplete: boolean;
  posts: any;

  ngOnInit() {
    this.callComplete = false;
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts()
      .subscribe((resp: any) => {
        this.posts = resp && resp.length ? resp.map(r => r as CompletePostModel) : [];
        this.posts.map(post => {
          post.date = new Date(post.date).toLocaleString();
        });
        this.callComplete = true;
      });
  }

}
