import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() UserName: string;
  @Input() Content: string;
  @Input() Url: string;
  @Input() type: string;
  @Input() date: Date;
  @Input() UserID: number;

  like: boolean;
  localUser: any;

  formTexto: FormGroup;
  formImagen: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private userService: UserService) { }

  ngOnInit() {
    this.like = false;
    this.localUser = this.userService.getLocalUser();
    this.formTexto = this.fb.group({
      texto: ['', Validators.required]
    });
    this.formImagen = this.fb.group({
      imagen: null,
      texto: ''
    });
  }

  deletePost(id: any) {
    this.postService.deletePost(id)
      .subscribe(resp => {
        
      }, error => {
        console.log(error);
      });
  }

  likePost() {
    this.like = true;
  }

  dislikePost() {
    this.like = false;
  }
}
