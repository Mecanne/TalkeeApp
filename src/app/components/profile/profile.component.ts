import { Component, OnInit, HostListener } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { PostModel } from "src/app/models/post-model";
import { PostService } from "../../services/post.service";
import { ToastrService } from "ngx-toastr";
import { UserModel } from "src/app/models/user-model";
import { Followers } from "../../models/followers";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  formPost: FormGroup;

  // tslint:disable-next-line: max-line-length
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private postService: PostService,
    private toastr: ToastrService
  ) {
    this.formPost = this.fb.group({
      texto: new FormControl('',[Validators.required,Validators.maxLength(400)])
    });
  }

  user: any;
  posts = [];
  followers: number;
  follows: number;
  texto: string;

  ngOnInit() {
    this.texto = '';
    this.user = this.userService.getLocalUser();
    this.getAllUserPosts();
  }

  getAllUserPosts() {
    this.postService.getAllPost(this.user.UserID).subscribe((resp: any) => {
      this.posts = resp && resp.length ? resp.map(r => r as PostModel) : [];
      this.posts.map(post => {
        post.date = new Date(post.date).toLocaleString();
      });
    });
    this.userService.getFollowers(this.user.UserID).subscribe(
      (resp: any) => {
        this.followers = resp.length;
      },
      error => {
      }
    );
    this.userService.getFollows(this.user.UserID).subscribe(
      (resp: any) => {
        this.follows = resp.length;
      },
      error => {
      }
    );
  }

  createPost(formValue: { texto: string }) {
    const post = new PostModel();
    post.UserID = this.userService.getLocalUser().UserID;
    post.Content = formValue.texto;
    post.Date = new Date();
    post.type = "text";
    post.likes = 0;
    this.formPost = this.fb.group({
      texto: new FormControl("")
    });
    this.postService.makePost(post).subscribe(
      resp => {
        this.toastr.success("¡Post creado!");
        this.getAllUserPosts();
      },
      error => {
        this.toastr.error("Error al crear el post");
        console.log(error);
      }
    );
  }

  comprobarTexto(texto: string) {
    if (texto.length >= 400) {
      this.toastr.warning('La logitud maxima del texto es de 400 caracteres.');
    }
  }
}
