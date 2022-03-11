import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Post } from '../post';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user?: User;

  posts: Post[] = [];
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

  }
/*
  getUsers(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser()
      .subscribe(users => this.users = users);
  }*/

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}
