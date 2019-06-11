import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formPost: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private postService: PostService) { }

  user: any;
  posts: any;

  ngOnInit() {
    this.user = this.userService.getUser();

    this.posts = this.postService.getAllPost(this.user.UserID);

    this.formPost = this.fb.group({
      texto: new FormControl('')
    });
  }

  createPost(formValue: { texto: string; }) {
    const post = new PostModel();
    post.UserID = this.userService.getUser().UserID;
    post.Content = formValue.texto;
    post.Date = new Date();
    post.type = 'text';
    post.likes = 0;
    this.postService.makePost(post);
  }

}
