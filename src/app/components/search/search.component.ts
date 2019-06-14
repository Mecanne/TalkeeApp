import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../models/user-model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string;
  userlist: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
// tslint:disable-next-line: no-string-literal
      this.query = params['query'];
      this.userService.searchUsers(this.query)
      .subscribe((resp: any) => {
        this.userlist = resp && resp.length ? resp.map(r => r as UserModel) : [];
      });
    });
  }

}
