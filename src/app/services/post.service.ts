import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/post-model';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService, private router: Router) { }

  getAllPost(userid: number): Observable<PostModel[]> {
    this.http.get('http://localhost:55535/api/Post/getall?UserID=' + userid).pipe()
      
    )
  }

  makePost(post: PostModel) {
    this.http.post(environment.API_URL + 'Post', post)
      .subscribe(resp => {
        console.log(resp);
        this.toastr.success('¡Post creado!');
        this.router.navigate(['home']);
      }, error => {
        console.log(error);
        this.toastr.error('Error al crear el post');
      });
  }
}
