import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PostModel } from '../../models/post-model';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formPost: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private userService: UserService) { }

  ngOnInit() {
    this.formPost = this.fb.group({
      texto: new FormControl('')
    });
  }

  createPost(formValue: { texto: string; }) {
    const post = new PostModel();
    post.UserID = this.userService.getLocalUser().UserID;
    post.Content = formValue.texto;
    post.Date = new Date();
    post.type = 'text';
    post.likes = 0;
    this.postService.makePost(post);
  }

}
