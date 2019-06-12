import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user-model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formPost: FormGroup;

// tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private userService: UserService, private postService: PostService, private toastr: ToastrService) {
    this.formPost = this.fb.group({
      texto: new FormControl('')
    });
  }

  user: any;
  posts =  [];

  ngOnInit() {
    this.user = this.userService.getLocalUser();
    this.getAllUserPosts();
  }

  getAllUserPosts() {
    this.postService.getAllPost(this.user.UserID)
      .subscribe((resp: any) => {
        this.posts = resp && resp.length ? resp.map(r => r as PostModel) : [];
        this.posts.map(post => {
          post.date = new Date(post.date).toLocaleString();
        });
      });
  }

  createPost(formValue: { texto: string; }) {
    const post = new PostModel();
    post.UserID = this.userService.getLocalUser().UserID;
    post.Content = formValue.texto;
    post.Date = new Date();
    post.type = 'text';
    post.likes = 0;
    this.formPost = this.fb.group({
      texto: new FormControl('')
    });
    this.postService.makePost(post).subscribe(resp => {
      this.toastr.success('¡Post creado!');
      this.getAllUserPosts();
    }, error => {
      this.toastr.error('Error al crear el post');
    });

  }

}
